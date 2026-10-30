import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private users: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser('id') userId: string) {
    return this.users.getProfile(userId)
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update user profile' })
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body() data: {
      name?: string
      avatarUrl?: string
      learningLanguage?: string
      uiLanguage?: string
      dailyGoalXp?: number
      timezone?: string
      notifications?: boolean
    }
  ) {
    return this.users.updateProfile(userId, data)
  }

  @Get('me/settings')
  @ApiOperation({ summary: 'Get user settings' })
  async getSettings(@CurrentUser('id') userId: string) {
    return this.users.getSettings(userId)
  }

  @Patch('me/settings')
  @ApiOperation({ summary: 'Update user settings' })
  async updateSettings(
    @CurrentUser('id') userId: string,
    @Body() data: {
      uiLanguage?: string
      learningLanguage?: string
      dailyGoalXp?: number
      timezone?: string
      notifications?: boolean
    }
  ) {
    return this.users.updateSettings(userId, data)
  }

  @Get('me/stats')
  @ApiOperation({ summary: 'Get user statistics' })
  async getStats(@CurrentUser('id') userId: string) {
    return this.users.getStats(userId)
  }
}