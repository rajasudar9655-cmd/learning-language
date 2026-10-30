import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async register(dto: RegisterDto) {
    // Check if user exists
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    })

    if (existing) {
      if (existing.email === dto.email) {
        throw new ConflictException('Email already registered')
      }
      throw new ConflictException('Username already taken')
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 12)

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        name: dto.name,
        passwordHash,
        learningLanguage: 'es', // Default to Spanish
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatarUrl: true,
        xp: true,
        level: true,
        streak: true,
        gems: true,
        hearts: true,
        isSuper: true,
        learningLanguage: true,
        uiLanguage: true,
        createdAt: true,
      },
    })

    // Create default quest progress for new user
    const today = new Date()
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000)

    const dailyQuests = await this.prisma.quest.findMany({
      where: { type: 'DAILY', isActive: true },
    })

    for (const quest of dailyQuests) {
      await this.prisma.userQuestProgress.create({
        data: {
          userId: user.id,
          questId: quest.id,
        },
      })
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email)

    return {
      user,
      ...tokens,
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash)
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { updatedAt: new Date() },
    })

    const tokens = await this.generateTokens(user.id, user.email)

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        avatarUrl: user.avatarUrl,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        gems: user.gems,
        hearts: user.hearts,
        isSuper: user.isSuper,
        learningLanguage: user.learningLanguage,
        uiLanguage: user.uiLanguage,
      },
      ...tokens,
    }
  }

  async refreshTokens(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    })

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return this.generateTokens(user.id, user.email)
  }

  private async generateTokens(userId: string, email: string) {
    const accessToken = this.jwt.sign(
      { sub: userId, email },
      { expiresIn: '15m' }
    )

    const refreshToken = this.jwt.sign(
      { sub: userId, type: 'refresh' },
      { expiresIn: '7d' }
    )

    return { accessToken, refreshToken }
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatarUrl: true,
        xp: true,
        level: true,
        streak: true,
        gems: true,
        hearts: true,
        isSuper: true,
        learningLanguage: true,
        uiLanguage: true,
      },
    })

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return user
  }
}