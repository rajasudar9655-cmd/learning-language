import { PrismaClient, ExerciseType, SessionType, QuestType, FriendStatus, QuestStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ============================================
  // CREATE LEAGUES
  // ============================================
  const leagues = [
    { name: 'Bronze', tier: 1, minXp: 0, maxXp: 999, promoteCount: 10, demoteCount: 0, icon: '🥉', color: '#CD7F32' },
    { name: 'Silver', tier: 2, minXp: 1000, maxXp: 2999, promoteCount: 10, demoteCount: 5, icon: '🥈', color: '#C0C0C0' },
    { name: 'Gold', tier: 3, minXp: 3000, maxXp: 6999, promoteCount: 7, demoteCount: 5, icon: '🥇', color: '#FFD700' },
    { name: 'Sapphire', tier: 4, minXp: 7000, maxXp: 14999, promoteCount: 7, demoteCount: 5, icon: '💎', color: '#0F52BA' },
    { name: 'Ruby', tier: 5, minXp: 15000, maxXp: 29999, promoteCount: 5, demoteCount: 5, icon: '🔴', color: '#E0115F' },
    { name: 'Emerald', tier: 6, minXp: 30000, maxXp: 59999, promoteCount: 5, demoteCount: 5, icon: '💚', color: '#50C878' },
    { name: 'Amethyst', tier: 7, minXp: 60000, maxXp: 119999, promoteCount: 3, demoteCount: 5, icon: '💜', color: '#9966CC' },
    { name: 'Pearl', tier: 8, minXp: 120000, maxXp: 249999, promoteCount: 3, demoteCount: 5, icon: '🤍', color: '#F8F8FF' },
    { name: 'Obsidian', tier: 9, minXp: 250000, maxXp: 499999, promoteCount: 3, demoteCount: 5, icon: '🖤', color: '#3B3B3B' },
    { name: 'Diamond', tier: 10, minXp: 500000, promoteCount: 0, demoteCount: 5, icon: '💠', color: '#B9F2FF' },
  ]

  for (const league of leagues) {
    await prisma.league.upsert({
      where: { tier: league.tier },
      update: league,
      create: league,
    })
  }
  console.log('✅ Leagues created')

  // ============================================
  // CREATE ACHIEVEMENTS
  // ============================================
  const achievements = [
    // Streak achievements
    { key: 'streak_3', name: '3-Day Streak', description: 'Maintain a 3-day streak', icon: '🔥', xpReward: 10, gemReward: 0, category: 'streak' },
    { key: 'streak_7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', xpReward: 50, gemReward: 10, category: 'streak' },
    { key: 'streak_30', name: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '🔥', xpReward: 200, gemReward: 50, category: 'streak' },
    { key: 'streak_100', name: 'Centurion', description: 'Maintain a 100-day streak', icon: '🔥', xpReward: 500, gemReward: 100, category: 'streak' },
    { key: 'streak_365', name: 'Year Legend', description: 'Maintain a 365-day streak', icon: '🔥', xpReward: 1000, gemReward: 500, category: 'streak' },
    
    // XP achievements
    { key: 'xp_100', name: 'Getting Started', description: 'Earn 100 XP', icon: '⭐', xpReward: 10, gemReward: 0, category: 'xp' },
    { key: 'xp_1000', name: 'Rising Star', description: 'Earn 1,000 XP', icon: '⭐', xpReward: 50, gemReward: 10, category: 'xp' },
    { key: 'xp_10000', name: 'Polyglot', description: 'Earn 10,000 XP', icon: '⭐', xpReward: 200, gemReward: 50, category: 'xp' },
    { key: 'xp_100000', name: 'Language Master', description: 'Earn 100,000 XP', icon: '⭐', xpReward: 500, gemReward: 200, category: 'xp' },
    
    // League achievements
    { key: 'league_bronze', name: 'Bronze Contender', description: 'Reach Bronze League', icon: '🥉', xpReward: 20, gemReward: 5, category: 'course' },
    { key: 'league_diamond', name: 'Diamond Dynasty', description: 'Reach Diamond League', icon: '💠', xpReward: 500, gemReward: 200, category: 'course' },
    { key: 'league_top3', name: 'Podium Finish', description: 'Finish top 3 in your league', icon: '🏆', xpReward: 100, gemReward: 20, category: 'course' },
    { key: 'league_1st', name: 'League Champion', description: 'Finish #1 in your league', icon: '👑', xpReward: 200, gemReward: 50, category: 'course' },
    
    // Social achievements
    { key: 'friend_1', name: 'Social Butterfly', description: 'Add your first friend', icon: '🦋', xpReward: 10, gemReward: 0, category: 'social' },
    { key: 'friend_10', name: 'Popular', description: 'Have 10 friends', icon: '🦋', xpReward: 50, gemReward: 10, category: 'social' },
    { key: 'friend_quest_1', name: 'Team Player', description: 'Complete a friend quest', icon: '🤝', xpReward: 20, gemReward: 5, category: 'social' },
    { key: 'friend_quest_10', name: 'Dynamic Duo', description: 'Complete 10 friend quests', icon: '🤝', xpReward: 100, gemReward: 20, category: 'social' },
    
    // Course achievements
    { key: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '👶', xpReward: 10, gemReward: 0, category: 'course' },
    { key: 'unit_1_complete', name: 'Rookie Graduate', description: 'Complete Unit 1', icon: '🎓', xpReward: 50, gemReward: 10, category: 'course' },
    { key: 'course_complete', name: 'Course Complete', description: 'Finish all units in a course', icon: '🏁', xpReward: 500, gemReward: 100, category: 'course' },
    { key: 'golden_owl', name: 'Golden Owl', description: 'Earn 5 crowns in all skills', icon: '🦉', xpReward: 1000, gemReward: 500, category: 'course' },
    
    // Special achievements
    { key: 'perfect_lesson', name: 'Perfectionist', description: 'Complete a lesson with no mistakes', icon: '💎', xpReward: 20, gemReward: 5, category: 'special' },
    { key: 'legendary_1', name: 'Legendary', description: 'Complete a Legendary level', icon: '🏆', xpReward: 100, gemReward: 20, category: 'special' },
    { key: 'early_bird', name: 'Early Bird', description: 'Complete a lesson before 8 AM', icon: '🌅', xpReward: 10, gemReward: 0, category: 'special' },
    { key: 'night_owl', name: 'Night Owl', description: 'Complete a lesson after 10 PM', icon: '🦉', xpReward: 10, gemReward: 0, category: 'special' },
    { key: 'weekend_warrior', name: 'Weekend Warrior', description: 'Complete lessons on both Saturday and Sunday', icon: '⚔️', xpReward: 30, gemReward: 5, category: 'special' },
  ]

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { key: achievement.key },
      update: achievement,
      create: achievement,
    })
  }
  console.log('✅ Achievements created')

  // ============================================
  // CREATE SPANISH COURSE
  // ============================================
  const spanishCourse = await prisma.course.upsert({
    where: {
      fromLanguage_toLanguage: {
        fromLanguage: 'en',
        toLanguage: 'es',
      },
    },
    update: {},
    create: {
      fromLanguage: 'en',
      toLanguage: 'es',
      name: 'Spanish for English Speakers',
      description: 'Learn Spanish from the basics to fluency',
      cefrLevel: 'A1',
      version: 1,
      isActive: true,
      wordCount: 0,
    },
  })
  console.log('✅ Spanish course created')

  // ============================================
  // CREATE UNITS
  // ============================================
  const units = [
    { courseId: spanishCourse.id, order: 1, name: 'Rookie', description: 'Start your Spanish journey with the basics' },
    { courseId: spanishCourse.id, order: 2, name: 'Explorer', description: 'Expand your vocabulary and grammar' },
    { courseId: spanishCourse.id, order: 3, name: 'Traveler', description: 'Navigate real-world situations' },
    { courseId: spanishCourse.id, order: 4, name: 'Conversationalist', description: 'Hold natural conversations' },
  ]

  const createdUnits = []
  for (const unit of units) {
    const created = await prisma.unit.upsert({
      where: { courseId_order: { courseId: spanishCourse.id, order: unit.order } },
      update: unit,
      create: unit,
    })
    createdUnits.push(created)
  }
  console.log('✅ Units created')

  // ============================================
  // CREATE SKILLS FOR UNIT 1 (ROOKIE)
  // ============================================
  const unit1Skills = [
    {
      courseId: spanishCourse.id,
      unitId: createdUnits[0].id,
      order: 1,
      name: 'Basics 1',
      description: 'Essential greetings and introductions',
      icon: '👋',
      color: '#58CC02',
      xpReward: 40,
      crownLevels: 5,
    },
    {
      courseId: spanishCourse.id,
      unitId: createdUnits[0].id,
      order: 2,
      name: 'Phrases',
      description: 'Common phrases for everyday use',
      icon: '💬',
      color: '#58CC02',
      xpReward: 40,
      crownLevels: 5,
    },
    {
      courseId: spanishCourse.id,
      unitId: createdUnits[0].id,
      order: 3,
      name: 'Basics 2',
      description: 'Pronouns and essential verbs',
      icon: '🔤',
      color: '#58CC02',
      xpReward: 40,
      crownLevels: 5,
    },
    {
      courseId: spanishCourse.id,
      unitId: createdUnits[0].id,
      order: 4,
      name: 'Food',
      description: 'Food vocabulary and ordering',
      icon: '🍎',
      color: '#58CC02',
      xpReward: 40,
      crownLevels: 5,
    },
    {
      courseId: spanishCourse.id,
      unitId: createdUnits[0].id,
      order: 5,
      name: 'Animals',
      description: 'Talk about animals and pets',
      icon: '🐕',
      color: '#58CC02',
      xpReward: 40,
      crownLevels: 5,
    },
  ]

  const createdSkills = []
  for (const skill of unit1Skills) {
    const created = await prisma.skill.upsert({
      where: { courseId_order: { courseId: spanishCourse.id, order: skill.order } },
      update: skill,
      create: skill,
    })
    createdSkills.push(created)
  }
  console.log('✅ Unit 1 skills created')

  // ============================================
  // CREATE LESSONS AND EXERCISES FOR BASICS 1
  // ============================================
  const basics1Skill = createdSkills[0]

  // Lesson 1: Greetings
  const lesson1 = await prisma.lesson.upsert({
    where: { skillId_order: { skillId: basics1Skill.id, order: 1 } },
    update: {},
    create: {
      skillId: basics1Skill.id,
      order: 1,
      name: 'Lesson 1',
      xpReward: 10,
      exerciseCount: 17,
    },
  })

  // Exercise templates for Lesson 1
  const lesson1Exercises = [
    // TRANSLATE: target -> base
    { order: 1, type: ExerciseType.TRANSLATE, prompt: 'Hola', correctAnswer: 'Hello', acceptedAnswers: ['Hello', 'Hi'], options: ['Hello', 'Goodbye', 'Thanks', 'Please'], xpReward: 5, difficulty: 1 },
    { order: 2, type: ExerciseType.TRANSLATE, prompt: 'Adiós', correctAnswer: 'Goodbye', acceptedAnswers: ['Goodbye', 'Bye'], options: ['Hello', 'Goodbye', 'Thanks', 'Please'], xpReward: 5, difficulty: 1 },
    { order: 3, type: ExerciseType.TRANSLATE, prompt: 'Gracias', correctAnswer: 'Thank you', acceptedAnswers: ['Thank you', 'Thanks'], options: ['Hello', 'Goodbye', 'Thank you', 'Please'], xpReward: 5, difficulty: 1 },
    { order: 4, type: ExerciseType.TRANSLATE, prompt: 'Por favor', correctAnswer: 'Please', acceptedAnswers: ['Please'], options: ['Hello', 'Goodbye', 'Thanks', 'Please'], xpReward: 5, difficulty: 1 },
    
    // TRANSLATE: base -> target
    { order: 5, type: ExerciseType.TRANSLATE, prompt: 'Hello', correctAnswer: 'Hola', acceptedAnswers: ['Hola'], options: ['Hola', 'Adiós', 'Gracias', 'Por favor'], xpReward: 5, difficulty: 1 },
    { order: 6, type: ExerciseType.TRANSLATE, prompt: 'Goodbye', correctAnswer: 'Adiós', acceptedAnswers: ['Adiós'], options: ['Hola', 'Adiós', 'Gracias', 'Por favor'], xpReward: 5, difficulty: 1 },
    
    // LISTEN
    { order: 7, type: ExerciseType.LISTEN, prompt: 'Type what you hear', correctAnswer: 'Hola', acceptedAnswers: ['Hola'], xpReward: 5, difficulty: 1, promptAudio: '/audio/es/hola.mp3' },
    { order: 8, type: ExerciseType.LISTEN, prompt: 'Type what you hear', correctAnswer: 'Gracias', acceptedAnswers: ['Gracias'], xpReward: 5, difficulty: 1, promptAudio: '/audio/es/gracias.mp3' },
    
    // SPEAK
    { order: 9, type: ExerciseType.SPEAK, prompt: 'Say: Hola', correctAnswer: 'Hola', acceptedAnswers: ['Hola'], xpReward: 5, difficulty: 1 },
    { order: 10, type: ExerciseType.SPEAK, prompt: 'Say: Gracias', correctAnswer: 'Gracias', acceptedAnswers: ['Gracias'], xpReward: 5, difficulty: 1 },
    
    // MATCH
    { order: 11, type: ExerciseType.MATCH, prompt: 'Match the pairs', correctAnswer: '', acceptedAnswers: [], pairs: [
      { left: 'Hola', right: 'Hello' },
      { left: 'Adiós', right: 'Goodbye' },
      { left: 'Gracias', right: 'Thank you' },
      { left: 'Por favor', right: 'Please' },
    ], xpReward: 5, difficulty: 1 },
    
    // TAP_PAIRS
    { order: 12, type: ExerciseType.TAP_PAIRS, prompt: 'Tap the matching pairs', correctAnswer: '', acceptedAnswers: [], pairs: [
      { left: 'Hola', right: 'Hello' },
      { left: 'Adiós', right: 'Goodbye' },
      { left: 'Sí', right: 'Yes' },
      { left: 'No', right: 'No' },
    ], xpReward: 5, difficulty: 1 },
    
    // COMPLETE
    { order: 13, type: ExerciseType.COMPLETE, prompt: 'Complete: "¡___, mundo!"', correctAnswer: 'Hola', acceptedAnswers: ['Hola'], sentenceParts: ['¡', 'Hola', ',', 'mundo', '!'], blankIndex: 1, xpReward: 5, difficulty: 1 },
    { order: 14, type: ExerciseType.COMPLETE, prompt: 'Complete: "___ amigos"', correctAnswer: 'Hola', acceptedAnswers: ['Hola'], sentenceParts: ['Hola', 'amigos'], blankIndex: 0, xpReward: 5, difficulty: 1 },
    
    // SELECT
    { order: 15, type: ExerciseType.SELECT, prompt: 'Select the correct translation for "Goodbye"', correctAnswer: 'Adiós', acceptedAnswers: ['Adiós'], options: ['Hola', 'Adiós', 'Gracias', 'Por favor'], xpReward: 5, difficulty: 1 },
    { order: 16, type: ExerciseType.SELECT, prompt: 'Select the correct translation for "Please"', correctAnswer: 'Por favor', acceptedAnswers: ['Por favor'], options: ['Hola', 'Adiós', 'Gracias', 'Por favor'], xpReward: 5, difficulty: 1 },
    
    // FILL_BLANK
    { order: 17, type: ExerciseType.FILL_BLANK, prompt: 'Fill in the blank: "___ a todos"', correctAnswer: 'Hola', acceptedAnswers: ['Hola'], options: ['Hola', 'Adiós', 'Gracias'], xpReward: 5, difficulty: 1 },
  ]

  for (const ex of lesson1Exercises) {
    await prisma.exercise.upsert({
      where: { lessonId_order: { lessonId: lesson1.id, order: ex.order } },
      update: ex,
      create: { ...ex, lessonId: lesson1.id },
    })
  }

  // Lesson 2: Introductions
  const lesson2 = await prisma.lesson.upsert({
    where: { skillId_order: { skillId: basics1Skill.id, order: 2 } },
    update: {},
    create: {
      skillId: basics1Skill.id,
      order: 2,
      name: 'Lesson 2',
      xpReward: 10,
      exerciseCount: 17,
    },
  })

  const lesson2Exercises = [
    { order: 1, type: ExerciseType.TRANSLATE, prompt: 'Me llamo', correctAnswer: 'My name is', acceptedAnswers: ['My name is', "I'm called"], options: ['My name is', 'I am', 'You are', 'We are'], xpReward: 5, difficulty: 1 },
    { order: 2, type: ExerciseType.TRANSLATE, prompt: '¿Cómo te llamas?', correctAnswer: "What's your name?", acceptedAnswers: ["What's your name?", 'What is your name?'], options: ["What's your name?", 'How are you?', 'Where are you from?', 'Goodbye'], xpReward: 5, difficulty: 1 },
    { order: 3, type: ExerciseType.TRANSLATE, prompt: 'Soy', correctAnswer: 'I am', acceptedAnswers: ['I am', "I'm"], options: ['I am', 'You are', 'He is', 'We are'], xpReward: 5, difficulty: 1 },
    { order: 4, type: ExerciseType.TRANSLATE, prompt: 'Mucho gusto', correctAnswer: 'Nice to meet you', acceptedAnswers: ['Nice to meet you', 'Pleased to meet you'], options: ['Nice to meet you', 'Goodbye', 'Thank you', 'Please'], xpReward: 5, difficulty: 1 },
    { order: 5, type: ExerciseType.TRANSLATE, prompt: 'My name is', correctAnswer: 'Me llamo', acceptedAnswers: ['Me llamo'], options: ['Me llamo', '¿Cómo te llamas?', 'Soy', 'Mucho gusto'], xpReward: 5, difficulty: 1 },
    { order: 6, type: ExerciseType.TRANSLATE, prompt: "I'm", correctAnswer: 'Soy', acceptedAnswers: ['Soy'], options: ['Me llamo', '¿Cómo te llamas?', 'Soy', 'Mucho gusto'], xpReward: 5, difficulty: 1 },
    { order: 7, type: ExerciseType.LISTEN, prompt: 'Type what you hear', correctAnswer: 'Me llamo', acceptedAnswers: ['Me llamo'], xpReward: 5, difficulty: 1, promptAudio: '/audio/es/me_llamo.mp3' },
    { order: 8, type: ExerciseType.LISTEN, prompt: 'Type what you hear', correctAnswer: 'Mucho gusto', acceptedAnswers: ['Mucho gusto'], xpReward: 5, difficulty: 1, promptAudio: '/audio/es/mucho_gusto.mp3' },
    { order: 9, type: ExerciseType.SPEAK, prompt: 'Say: Me llamo', correctAnswer: 'Me llamo', acceptedAnswers: ['Me llamo'], xpReward: 5, difficulty: 1 },
    { order: 10, type: ExerciseType.SPEAK, prompt: 'Say: Mucho gusto', correctAnswer: 'Mucho gusto', acceptedAnswers: ['Mucho gusto'], xpReward: 5, difficulty: 1 },
    { order: 11, type: ExerciseType.MATCH, prompt: 'Match the pairs', correctAnswer: '', acceptedAnswers: [], pairs: [
      { left: 'Me llamo', right: 'My name is' },
      { left: '¿Cómo te llamas?', right: "What's your name?" },
      { left: 'Soy', right: 'I am' },
      { left: 'Mucho gusto', right: 'Nice to meet you' },
    ], xpReward: 5, difficulty: 1 },
    { order: 12, type: ExerciseType.TAP_PAIRS, prompt: 'Tap the matching pairs', correctAnswer: '', acceptedAnswers: [], pairs: [
      { left: 'Yo', right: 'I' },
      { left: 'Tú', right: 'You' },
      { left: 'Él', right: 'He' },
      { left: 'Ella', right: 'She' },
    ], xpReward: 5, difficulty: 1 },
    { order: 13, type: ExerciseType.COMPLETE, prompt: 'Complete: "___ Juan"', correctAnswer: 'Me llamo', acceptedAnswers: ['Me llamo'], sentenceParts: ['Me', 'llamo', 'Juan'], blankIndex: 0, xpReward: 5, difficulty: 1 },
    { order: 14, type: ExerciseType.COMPLETE, prompt: 'Complete: "___ María"', correctAnswer: 'Soy', acceptedAnswers: ['Soy'], sentenceParts: ['Soy', 'María'], blankIndex: 0, xpReward: 5, difficulty: 1 },
    { order: 15, type: ExerciseType.SELECT, prompt: 'Select the correct translation for "Nice to meet you"', correctAnswer: 'Mucho gusto', acceptedAnswers: ['Mucho gusto'], options: ['Me llamo', '¿Cómo te llamas?', 'Soy', 'Mucho gusto'], xpReward: 5, difficulty: 1 },
    { order: 16, type: ExerciseType.SELECT, prompt: 'Select the correct translation for "I am"', correctAnswer: 'Soy', acceptedAnswers: ['Soy'], options: ['Me llamo', '¿Cómo te llamas?', 'Soy', 'Mucho gusto'], xpReward: 5, difficulty: 1 },
    { order: 17, type: ExerciseType.FILL_BLANK, prompt: 'Fill in the blank: "___ un estudiante"', correctAnswer: 'Soy', acceptedAnswers: ['Soy'], options: ['Me llamo', '¿Cómo te llamas?', 'Soy', 'Mucho gusto'], xpReward: 5, difficulty: 1 },
  ]

  for (const ex of lesson2Exercises) {
    await prisma.exercise.upsert({
      where: { lessonId_order: { lessonId: lesson2.id, order: ex.order } },
      update: ex,
      create: { ...ex, lessonId: lesson2.id },
    })
  }

  // Lessons 3, 4, 5 for Basics 1 (simplified)
  for (let i = 3; i <= 5; i++) {
    const lesson = await prisma.lesson.upsert({
      where: { skillId_order: { skillId: basics1Skill.id, order: i } },
      update: {},
      create: {
        skillId: basics1Skill.id,
        order: i,
        name: `Lesson ${i}`,
        xpReward: 10,
        exerciseCount: 17,
      },
    })

    // Create basic exercises for remaining lessons
    const basicExercises = [
      { order: 1, type: ExerciseType.TRANSLATE, prompt: `Word ${i}.1`, correctAnswer: `Answer ${i}.1`, acceptedAnswers: [`Answer ${i}.1`], options: [`Answer ${i}.1`, 'Wrong 1', 'Wrong 2', 'Wrong 3'], xpReward: 5, difficulty: 1 },
      { order: 2, type: ExerciseType.TRANSLATE, prompt: `Word ${i}.2`, correctAnswer: `Answer ${i}.2`, acceptedAnswers: [`Answer ${i}.2`], options: [`Answer ${i}.2`, 'Wrong 1', 'Wrong 2', 'Wrong 3'], xpReward: 5, difficulty: 1 },
      { order: 3, type: ExerciseType.TRANSLATE, prompt: `Word ${i}.3`, correctAnswer: `Answer ${i}.3`, acceptedAnswers: [`Answer ${i}.3`], options: [`Answer ${i}.3`, 'Wrong 1', 'Wrong 2', 'Wrong 3'], xpReward: 5, difficulty: 1 },
      { order: 4, type: ExerciseType.TRANSLATE, prompt: `Word ${i}.4`, correctAnswer: `Answer ${i}.4`, acceptedAnswers: [`Answer ${i}.4`], options: [`Answer ${i}.4`, 'Wrong 1', 'Wrong 2', 'Wrong 3'], xpReward: 5, difficulty: 1 },
      { order: 5, type: ExerciseType.TRANSLATE, prompt: `Translate ${i}.5`, correctAnswer: `Target ${i}.5`, acceptedAnswers: [`Target ${i}.5`], options: [`Target ${i}.5`, 'Wrong 1', 'Wrong 2', 'Wrong 3'], xpReward: 5, difficulty: 1 },
      { order: 6, type: ExerciseType.TRANSLATE, prompt: `Translate ${i}.6`, correctAnswer: `Target ${i}.6`, acceptedAnswers: [`Target ${i}.6`], options: [`Target ${i}.6`, 'Wrong 1', 'Wrong 2', 'Wrong 3'], xpReward: 5, difficulty: 1 },
      { order: 7, type: ExerciseType.LISTEN, prompt: 'Type what you hear', correctAnswer: `Audio ${i}.1`, acceptedAnswers: [`Audio ${i}.1`], xpReward: 5, difficulty: 1, promptAudio: `/audio/es/word_${i}_1.mp3` },
      { order: 8, type: ExerciseType.LISTEN, prompt: 'Type what you hear', correctAnswer: `Audio ${i}.2`, acceptedAnswers: [`Audio ${i}.2`], xpReward: 5, difficulty: 1, promptAudio: `/audio/es/word_${i}_2.mp3` },
      { order: 9, type: ExerciseType.SPEAK, prompt: `Say word ${i}.1`, correctAnswer: `Speak ${i}.1`, acceptedAnswers: [`Speak ${i}.1`], xpReward: 5, difficulty: 1 },
      { order: 10, type: ExerciseType.SPEAK, prompt: `Say word ${i}.2`, correctAnswer: `Speak ${i}.2`, acceptedAnswers: [`Speak ${i}.2`], xpReward: 5, difficulty: 1 },
      { order: 11, type: ExerciseType.MATCH, prompt: 'Match the pairs', correctAnswer: '', acceptedAnswers: [], pairs: [
        { left: `Left ${i}.1`, right: `Right ${i}.1` },
        { left: `Left ${i}.2`, right: `Right ${i}.2` },
        { left: `Left ${i}.3`, right: `Right ${i}.3` },
        { left: `Left ${i}.4`, right: `Right ${i}.4` },
      ], xpReward: 5, difficulty: 1 },
      { order: 12, type: ExerciseType.TAP_PAIRS, prompt: 'Tap matching pairs', correctAnswer: '', acceptedAnswers: [], pairs: [
        { left: `Tap ${i}.1`, right: `Match ${i}.1` },
        { left: `Tap ${i}.2`, right: `Match ${i}.2` },
        { left: `Tap ${i}.3`, right: `Match ${i}.3` },
        { left: `Tap ${i}.4`, right: `Match ${i}.4` },
      ], xpReward: 5, difficulty: 1 },
      { order: 13, type: ExerciseType.COMPLETE, prompt: `Complete sentence ${i}.1`, correctAnswer: `Complete ${i}.1`, acceptedAnswers: [`Complete ${i}.1`], sentenceParts: ['Part', `Complete ${i}.1`, 'End'], blankIndex: 1, xpReward: 5, difficulty: 1 },
      { order: 14, type: ExerciseType.COMPLETE, prompt: `Complete sentence ${i}.2`, correctAnswer: `Complete ${i}.2`, acceptedAnswers: [`Complete ${i}.2`], sentenceParts: ['Start', `Complete ${i}.2`], blankIndex: 1, xpReward: 5, difficulty: 1 },
      { order: 15, type: ExerciseType.SELECT, prompt: `Select correct for ${i}.1`, correctAnswer: `Select ${i}.1`, acceptedAnswers: [`Select ${i}.1`], options: [`Select ${i}.1`, 'Wrong 1', 'Wrong 2', 'Wrong 3'], xpReward: 5, difficulty: 1 },
      { order: 16, type: ExerciseType.SELECT, prompt: `Select correct for ${i}.2`, correctAnswer: `Select ${i}.2`, acceptedAnswers: [`Select ${i}.2`], options: [`Select ${i}.2`, 'Wrong 1', 'Wrong 2', 'Wrong 3'], xpReward: 5, difficulty: 1 },
      { order: 17, type: ExerciseType.FILL_BLANK, prompt: `Fill blank ${i}.1`, correctAnswer: `Blank ${i}.1`, acceptedAnswers: [`Blank ${i}.1`], options: [`Blank ${i}.1`, 'Wrong 1', 'Wrong 2'], xpReward: 5, difficulty: 1 },
    ]

    for (const ex of basicExercises) {
      await prisma.exercise.upsert({
        where: { lessonId_order: { lessonId: lesson.id, order: ex.order } },
        update: ex,
        create: { ...ex, lessonId: lesson.id },
      })
    }
  }

  // ============================================
  // CREATE VOCABULARY FOR BASICS 1
  // ============================================
  const basics1Vocab = [
    { skillId: basics1Skill.id, word: 'hola', translation: 'hello', partOfSpeech: 'interjection', frequency: 1000 },
    { skillId: basics1Skill.id, word: 'adiós', translation: 'goodbye', partOfSpeech: 'interjection', frequency: 950 },
    { skillId: basics1Skill.id, word: 'gracias', translation: 'thank you', partOfSpeech: 'interjection', frequency: 980 },
    { skillId: basics1Skill.id, word: 'por favor', translation: 'please', partOfSpeech: 'phrase', frequency: 900 },
    { skillId: basics1Skill.id, word: 'de nada', translation: "you're welcome", partOfSpeech: 'phrase', frequency: 850 },
    { skillId: basics1Skill.id, word: 'buenos días', translation: 'good morning', partOfSpeech: 'phrase', frequency: 920 },
    { skillId: basics1Skill.id, word: 'buenas noches', translation: 'good night', partOfSpeech: 'phrase', frequency: 880 },
    { skillId: basics1Skill.id, word: 'me llamo', translation: 'my name is', partOfSpeech: 'phrase', frequency: 800 },
    { skillId: basics1Skill.id, word: '¿cómo te llamas?', translation: "what's your name?", partOfSpeech: 'phrase', frequency: 750 },
    { skillId: basics1Skill.id, word: 'soy', translation: 'I am', partOfSpeech: 'verb', frequency: 990 },
    { skillId: basics1Skill.id, word: 'mucho gusto', translation: 'nice to meet you', partOfSpeech: 'phrase', frequency: 700 },
    { skillId: basics1Skill.id, word: 'sí', translation: 'yes', partOfSpeech: 'adverb', frequency: 1000 },
    { skillId: basics1Skill.id, word: 'no', translation: 'no', partOfSpeech: 'adverb', frequency: 1000 },
    { skillId: basics1Skill.id, word: 'yo', translation: 'I', partOfSpeech: 'pronoun', frequency: 1000 },
    { skillId: basics1Skill.id, word: 'tú', translation: 'you', partOfSpeech: 'pronoun', frequency: 980 },
    { skillId: basics1Skill.id, word: 'él', translation: 'he', partOfSpeech: 'pronoun', frequency: 950 },
    { skillId: basics1Skill.id, word: 'ella', translation: 'she', partOfSpeech: 'pronoun', frequency: 950 },
    { skillId: basics1Skill.id, word: 'nosotros', translation: 'we', partOfSpeech: 'pronoun', frequency: 900 },
    { skillId: basics1Skill.id, word: 'ustedes', translation: 'you (plural)', partOfSpeech: 'pronoun', frequency: 850 },
    { skillId: basics1Skill.id, word: 'ser', translation: 'to be', partOfSpeech: 'verb', frequency: 1000 },
  ]

  for (const vocab of basics1Vocab) {
    await prisma.vocabulary.upsert({
      where: { id: `${vocab.skillId}-${vocab.word}` }, // Using composite unique would be better
      update: vocab,
      create: vocab,
    })
  }
  console.log('✅ Basics 1 vocabulary created')

  // ============================================
  // CREATE DAILY QUESTS
  // ============================================
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000)

  const dailyQuests = [
    { type: QuestType.DAILY, name: 'Complete a Lesson', description: 'Finish one lesson', xpReward: 20, gemReward: 0, requirement: { action: 'complete_lesson', count: 1 }, startsAt: todayStart, endsAt: todayEnd },
    { type: QuestType.DAILY, name: 'Earn 50 XP', description: 'Earn 50 XP today', xpReward: 30, gemReward: 0, requirement: { action: 'earn_xp', count: 50 }, startsAt: todayStart, endsAt: todayEnd },
    { type: QuestType.DAILY, name: 'Practice Review', description: 'Complete a practice session', xpReward: 25, gemReward: 0, requirement: { action: 'complete_practice', count: 1 }, startsAt: todayStart, endsAt: todayEnd },
    { type: QuestType.DAILY, name: 'No Mistakes', description: 'Complete a lesson with 0 mistakes', xpReward: 40, gemReward: 5, requirement: { action: 'perfect_lesson', count: 1 }, startsAt: todayStart, endsAt: todayEnd },
  ]

  for (const quest of dailyQuests) {
    await prisma.quest.upsert({
      where: { id: `daily-${quest.name.replace(/\s+/g, '-')}` },
      update: quest,
      create: { ...quest, id: `daily-${quest.name.replace(/\s+/g, '-')}` },
    })
  }
  console.log('✅ Daily quests created')

  // ============================================
  // CREATE WEEKLY QUESTS
  // ============================================
  const weekStart = new Date(todayStart)
  weekStart.setDate(todayStart.getDate() - todayStart.getDay()) // Monday
  const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)

  const weeklyQuests = [
    { type: QuestType.WEEKLY, name: 'Weekly Warrior', description: 'Earn 500 XP this week', xpReward: 100, gemReward: 20, requirement: { action: 'earn_xp', count: 500 }, startsAt: weekStart, endsAt: weekEnd },
    { type: QuestType.WEEKLY, name: 'Lesson Master', description: 'Complete 10 lessons this week', xpReward: 150, gemReward: 30, requirement: { action: 'complete_lesson', count: 10 }, startsAt: weekStart, endsAt: weekEnd },
    { type: QuestType.WEEKLY, name: 'Streak Keeper', description: 'Maintain a 7-day streak', xpReward: 200, gemReward: 50, requirement: { action: 'maintain_streak', count: 7 }, startsAt: weekStart, endsAt: weekEnd },
  ]

  for (const quest of weeklyQuests) {
    await prisma.quest.upsert({
      where: { id: `weekly-${quest.name.replace(/\s+/g, '-')}` },
      update: quest,
      create: { ...quest, id: `weekly-${quest.name.replace(/\s+/g, '-')}` },
    })
  }
  console.log('✅ Weekly quests created')

  // ============================================
  // UPDATE COURSE WORD COUNT
  // ============================================
  const vocabCount = await prisma.vocabulary.count({ where: { skill: { courseId: spanishCourse.id } } })
  await prisma.course.update({
    where: { id: spanishCourse.id },
    data: { wordCount: vocabCount },
  })

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })