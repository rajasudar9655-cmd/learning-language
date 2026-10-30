import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { CoursesService } from './courses.service'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private courses: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all available courses' })
  async getCourses() {
    return this.courses.getCourses()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course details' })
  async getCourse(@Param('id') courseId: string) {
    return this.courses.getCourse(courseId)
  }

  @Get(':id/path')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get learning path with progress' })
  async getLearningPath(
    @Param('id') courseId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.courses.getLearningPath(courseId, userId)
  }

  @Post(':id/enroll')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enroll in a course' })
  async enroll(
    @Param('id') courseId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.courses.enroll(userId, courseId)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user enrolled courses' })
  async getUserCourses(@CurrentUser('id') userId: string) {
    return this.courses.getUserCourses(userId)
  }
}