import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { CoursesModule } from './courses/courses.module'
import { LessonsModule } from './lessons/lessons.module'
import { ProgressModule } from './progress/progress.module'
import { GamificationModule } from './gamification/gamification.module'
import { SocialModule } from './social/social.module'
import { StoriesModule } from './stories/stories.module'
import { WebsocketModule } from './websocket/websocket.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    LessonsModule,
    ProgressModule,
    GamificationModule,
    SocialModule,
    StoriesModule,
    WebsocketModule,
  ],
})
export class AppModule {}