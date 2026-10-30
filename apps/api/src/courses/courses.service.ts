import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async getCourses() {
    return this.prisma.course.findMany({
      where: { isActive: true },
      include: {
        units: {
          orderBy: { order: 'asc' },
          include: {
            skills: {
              orderBy: { order: 'asc' },
            },
          },
        },
        _count: {
          select: { users: true },
        },
      },
      orderBy: { name: 'asc' },
    })
  }

  async getCourse(courseId: string, userId?: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        units: {
          orderBy: { order: 'asc' },
          include: {
            skills: {
              orderBy: { order: 'asc' },
              include: {
                lessons: {
                  orderBy: { order: 'asc' },
                },
                progress: userId ? { where: { userId } } : false,
              },
            },
          },
        },
      },
    })

    if (!course) {
      throw new NotFoundException('Course not found')
    }

    return course
  }

  async getLearningPath(courseId: string, userId: string) {
    const course = await this.getCourse(courseId, userId)

    // Build the learning path with progress
    const path = course.units.map((unit) => ({
      ...unit,
      skills: unit.skills.map((skill) => ({
        ...skill,
        progress: skill.progress[0] || {
          crownLevel: 0,
          xpEarned: 0,
          lessonsCompleted: 0,
          strength: 1.0,
          nextReviewAt: null,
        },
        isLocked: skill.order > 1 && !unit.skills[skill.order - 2]?.progress[0]?.crownLevel,
      })),
    }))

    // Lock skills based on progress
    let previousSkillCompleted = false
    for (const unit of path) {
      for (const skill of unit.skills) {
        if (skill.order === 1) {
          skill.isLocked = false
        } else {
          const prevSkill = unit.skills.find(s => s.order === skill.order - 1)
          skill.isLocked = prevSkill ? prevSkill.progress.crownLevel === 0 : true
        }
        previousSkillCompleted = skill.progress.crownLevel > 0
      }
    }

    return { course, path }
  }

  async enroll(userId: string, courseId: string) {
    const course = await this.prisma.course.findUnique({ where: { id: courseId } })
    if (!course) {
      throw new NotFoundException('Course not found')
    }

    const enrollment = await this.prisma.userCourse.upsert({
      where: {
        userId_courseId: { userId, courseId },
      },
      update: { isActive: true, lastAccessedAt: new Date() },
      create: { userId, courseId },
    })

    return enrollment
  }

  async getUserCourses(userId: string) {
    return this.prisma.userCourse.findMany({
      where: { userId, isActive: true },
      include: {
        course: {
          include: {
            units: {
              orderBy: { order: 'asc' },
              include: {
                skills: {
                  orderBy: { order: 'asc' },
                  include: {
                    progress: { where: { userId } },
                  },
                },
              },
            },
          },
        },
      },
    })
  }
}