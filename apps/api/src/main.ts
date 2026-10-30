import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Duolingo Clone API')
    .setDescription('API for Duolingo Clone - Language Learning Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication')
    .addTag('users', 'User Management')
    .addTag('courses', 'Courses & Learning Path')
    .addTag('lessons', 'Lessons & Exercises')
    .addTag('progress', 'Progress Tracking')
    .addTag('gamification', 'XP, Streaks, Leagues, Quests')
    .addTag('social', 'Friends & Social Features')
    .addTag('stories', 'Stories & Reading Practice')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  const port = process.env.PORT || 4000
  await app.listen(port)
  console.log(`🚀 API server running on http://localhost:${port}`)
  console.log(`📚 Swagger docs at http://localhost:${port}/api/docs`)
}

bootstrap()