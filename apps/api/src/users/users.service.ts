import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
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
        maxStreak: true,
        gems: true,
        hearts: true,
        maxHearts: true,
        lastHeartRefill: true,
        isSuper: true,
        superExpiresAt: true,
        learningLanguage: true,
        uiLanguage: true,
        dailyGoalXp: true,
        timezone: true,
        notifications: true,
        createdAt: true,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async updateProfile(userId: string, data: {
    name?: string
    avatarUrl?: string
    learningLanguage?: string
    uiLanguage?: string
    dailyGoalXp?: number
    timezone?: string
    notifications?: boolean
  }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatarUrl: true,
        xp: true,
        level: true,
        streak: true,
        maxStreak: true,
        gems: true,
        hearts: true,
        isSuper: true,
        learningLanguage: true,
        uiLanguage: true,
        dailyGoalXp: true,
        timezone: true,
        notifications: true,
      },
    })
  }

  async getSettings(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        uiLanguage: true,
        learningLanguage: true,
        dailyGoalXp: true,
        timezone: true,
        notifications: true,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async updateSettings(userId: string, data: {
    uiLanguage?: string
    learningLanguage?: string
    dailyGoalXp?: number
    timezone?: string
    notifications?: boolean
  }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        uiLanguage: true,
        learningLanguage: true,
        dailyGoalXp: true,
        timezone: true,
        notifications: true,
      },
    })
  }

  async getStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        xp: true,
        level: true,
        streak: true,
        maxStreak: true,
        gems: true,
        hearts: true,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    // Get additional stats
    const [lessonsCompleted, skillsLearned, totalSessions, friendsCount] = await Promise.all([
      this.prisma.lessonProgress.count({
        where: { userId, completed: true },
      }),
      this.prisma.skillProgress.count({
        where: { userId, crownLevel: { gte: 1 } },
      }),
      this.prisma.practiceSession.count({
        where: { userId, isCompleted: true },
      }),
      this.prisma.friend.count({
        where: {
          OR: [{ requesterId: userId }, { receiverId: userId }],
          status: 'ACCEPTED',
        },
      }),
    ])

    return {
      ...user,
      lessonsCompleted,
      skillsLearned,
      totalSessions,
      friendsCount,
    }
  }
}