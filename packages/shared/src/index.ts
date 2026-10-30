// Exercise Types
export enum ExerciseType {
  TRANSLATE = 'TRANSLATE',
  LISTEN = 'LISTEN',
  SPEAK = 'SPEAK',
  MATCH = 'MATCH',
  TAP_PAIRS = 'TAP_PAIRS',
  COMPLETE = 'COMPLETE',
  SELECT = 'SELECT',
  FILL_BLANK = 'FILL_BLANK',
  CONJUGATE = 'CONJUGATE',
  LISTEN_TAP = 'LISTEN_TAP',
  STORY_QUESTION = 'STORY_QUESTION',
}

// Session Types
export enum SessionType {
  LESSON = 'LESSON',
  PRACTICE = 'PRACTICE',
  STORY = 'STORY',
  LEGENDARY = 'LEGENDARY',
  REVIEW = 'REVIEW',
  QUEST = 'QUEST',
  FRIEND_QUEST = 'FRIEND_QUEST',
}

// Quest Types
export enum QuestType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  FRIEND = 'FRIEND',
  SPECIAL = 'SPECIAL',
}

// Languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
] as const

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code']

// Gamification Constants
export const XP_PER_EXERCISE = 5
export const XP_PER_LESSON_COMPLETE = 10
export const XP_PERFECT_LESSON_BONUS = 5
export const XP_STORY_PAGE = 14
export const XP_LEGENDARY_LEVEL = 40
export const XP_FRIEND_QUEST = 40

export const STREAK_BONUSES: Record<number, number> = {
  7: 10,
  14: 20,
  30: 25,
  60: 50,
  100: 100,
  200: 200,
  365: 100,
  500: 200,
  1000: 500,
}

export const LEAGUE_TIERS = [
  { name: 'Bronze', tier: 1, minXp: 0, promoteCount: 10, demoteCount: 0, icon: '🥉', color: '#CD7F32' },
  { name: 'Silver', tier: 2, minXp: 1000, promoteCount: 10, demoteCount: 5, icon: '🥈', color: '#C0C0C0' },
  { name: 'Gold', tier: 3, minXp: 3000, promoteCount: 7, demoteCount: 5, icon: '🥇', color: '#FFD700' },
  { name: 'Sapphire', tier: 4, minXp: 7000, promoteCount: 7, demoteCount: 5, icon: '💎', color: '#0F52BA' },
  { name: 'Ruby', tier: 5, minXp: 15000, promoteCount: 5, demoteCount: 5, icon: '🔴', color: '#E0115F' },
  { name: 'Emerald', tier: 6, minXp: 30000, promoteCount: 5, demoteCount: 5, icon: '💚', color: '#50C878' },
  { name: 'Amethyst', tier: 7, minXp: 60000, promoteCount: 3, demoteCount: 5, icon: '💜', color: '#9966CC' },
  { name: 'Pearl', tier: 8, minXp: 120000, promoteCount: 3, demoteCount: 5, icon: '🤍', color: '#F8F8FF' },
  { name: 'Obsidian', tier: 9, minXp: 250000, promoteCount: 3, demoteCount: 5, icon: '🖤', color: '#3B3B3B' },
  { name: 'Diamond', tier: 10, minXp: 500000, promoteCount: 0, demoteCount: 5, icon: '💠', color: '#B9F2FF' },
] as const

export const HEARTS_MAX = 5
export const HEART_REFILL_TIME_MS = 5 * 60 * 1000 // 5 minutes
export const HEART_REFILL_GEMS = 350

export const CROWN_LEVELS = 5
export const LEGENDARY_LEVELS = 2

// SM-2 Algorithm Constants
export const SM2_INITIAL_EASE_FACTOR = 2.5
export const SM2_MIN_EASE_FACTOR = 1.3
export const SM2_INITIAL_INTERVAL = 1
export const SM2_SECOND_INTERVAL = 6

// Grade values for SM-2 (0-5)
export enum SM2Grade {
  BLACKOUT = 0,        // Complete blackout
  WRONG = 1,           // Incorrect, answer unfamiliar
  WRONG_RECOGNIZED = 2, // Incorrect, recognized after seeing answer
  HARD = 3,            // Correct with difficulty
  GOOD = 4,            // Correct with slight hesitation
  PERFECT = 5,         // Perfect, instant recall
}

// XP Calculation
export function calculateLevel(xp: number): number {
  // Duolingo-style level curve: roughly quadratic
  return Math.floor(Math.sqrt(xp / 50)) + 1
}

export function xpForLevel(level: number): number {
  return (level - 1) ** 2 * 50
}

export function xpToNextLevel(xp: number): number {
  const currentLevel = calculateLevel(xp)
  return xpForLevel(currentLevel + 1) - xp
}

export function xpProgressInLevel(xp: number): number {
  const currentLevel = calculateLevel(xp)
  const currentLevelXp = xpForLevel(currentLevel)
  const nextLevelXp = xpForLevel(currentLevel + 1)
  return (xp - currentLevelXp) / (nextLevelXp - currentLevelXp)
}

// Streak Calculation
export function calculateStreakBonus(streak: number): number {
  return STREAK_BONUSES[streak] || 0
}

// Heart System
export function canAffordHeartRefill(gems: number): boolean {
  return gems >= HEART_REFILL_GEMS
}

export function getHeartRefillTime(lastRefill: Date | null): number {
  if (!lastRefill) return 0
  const elapsed = Date.now() - lastRefill.getTime()
  const heartsToRefill = Math.floor(elapsed / HEART_REFILL_TIME_MS)
  return Math.min(heartsToRefill, HEARTS_MAX)
}

// League Helpers
export function getLeagueForXp(xp: number) {
  for (let i = LEAGUE_TIERS.length - 1; i >= 0; i--) {
    if (xp >= LEAGUE_TIERS[i].minXp) {
      return LEAGUE_TIERS[i]
    }
  }
  return LEAGUE_TIERS[0]
}

export function getLeagueTier(xp: number): number {
  return getLeagueForXp(xp).tier
}

// Crown Progress
export function getCrownProgress(crownLevel: number, totalCrowns: number = 5): number {
  return crownLevel / totalCrowns
}

export function isSkillMaxed(crownLevel: number, maxCrowns: number = 5): boolean {
  return crownLevel >= maxCrowns
}

// Exercise Helpers
export function getExerciseTypeLabel(type: ExerciseType): string {
  const labels: Record<ExerciseType, string> = {
    [ExerciseType.TRANSLATE]: 'Translate',
    [ExerciseType.LISTEN]: 'Listen',
    [ExerciseType.SPEAK]: 'Speak',
    [ExerciseType.MATCH]: 'Match',
    [ExerciseType.TAP_PAIRS]: 'Tap Pairs',
    [ExerciseType.COMPLETE]: 'Complete',
    [ExerciseType.SELECT]: 'Select',
    [ExerciseType.FILL_BLANK]: 'Fill Blank',
    [ExerciseType.CONJUGATE]: 'Conjugate',
    [ExerciseType.LISTEN_TAP]: 'Listen & Tap',
    [ExerciseType.STORY_QUESTION]: 'Story Question',
  }
  return labels[type] || type
}

export function isExerciseTypeAudio(type: ExerciseType): boolean {
  return [ExerciseType.LISTEN, ExerciseType.SPEAK, ExerciseType.LISTEN_TAP].includes(type)
}

export function isExerciseTypeTextInput(type: ExerciseType): boolean {
  return [
    ExerciseType.TRANSLATE,
    ExerciseType.LISTEN,
    ExerciseType.COMPLETE,
    ExerciseType.FILL_BLANK,
    ExerciseType.CONJUGATE,
  ].includes(type)
}

// Date Helpers
export function startOfDay(date: Date = new Date()): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function endOfDay(date: Date = new Date()): Date {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

export function startOfWeek(date: Date = new Date()): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Monday start
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function endOfWeek(date: Date = new Date()): Date {
  const d = startOfWeek(date)
  d.setDate(d.getDate() + 6)
  d.setHours(23, 59, 59, 999)
  return d
}

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  return `${weeks}w ago`
}

// Validation
export function normalizeAnswer(answer: string): string {
  return answer
    .toLowerCase()
    .trim()
    .replace(/[¿?¡!.,;:]/g, '')
    .replace(/\s+/g, ' ')
}

export function checkAnswer(userAnswer: string, correctAnswer: string, acceptedAnswers: string[] = []): boolean {
  const normalizedUser = normalizeAnswer(userAnswer)
  const normalizedCorrect = normalizeAnswer(correctAnswer)
  const normalizedAccepted = acceptedAnswers.map(normalizeAnswer)
  
  if (normalizedUser === normalizedCorrect) return true
  if (normalizedAccepted.includes(normalizedUser)) return true
  
  // Fuzzy match for typos (Levenshtein distance <= 2)
  return levenshteinDistance(normalizedUser, normalizedCorrect) <= 2
}

function levenshteinDistance(a: string, b: string): number {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null))
  
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j
  
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + cost // substitution
      )
    }
  }
  
  return matrix[b.length][a.length]
}

// SM-2 Algorithm
export interface SM2Result {
  easeFactor: number
  interval: number
  repetitions: number
  nextReviewAt: Date
  lapses: number
}

export function calculateSM2(
  grade: SM2Grade,
  easeFactor: number,
  interval: number,
  repetitions: number,
  lapses: number
): SM2Result {
  let newEaseFactor = easeFactor
  let newInterval = interval
  let newRepetitions = repetitions
  let newLapses = lapses
  
  if (grade >= SM2Grade.HARD) {
    // Successful recall
    if (repetitions === 0) {
      newInterval = SM2_INITIAL_INTERVAL
    } else if (repetitions === 1) {
      newInterval = SM2_SECOND_INTERVAL
    } else {
      newInterval = Math.round(interval * easeFactor)
    }
    newRepetitions = repetitions + 1
  } else {
    // Failed recall
    newRepetitions = 0
    newInterval = SM2_INITIAL_INTERVAL
    newLapses = lapses + 1
  }
  
  // Update ease factor
  newEaseFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  newEaseFactor = Math.max(SM2_MIN_EASE_FACTOR, newEaseFactor)
  
  const nextReviewAt = new Date()
  nextReviewAt.setDate(nextReviewAt.getDate() + newInterval)
  
  return {
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReviewAt,
    lapses: newLapses,
  }
}

// Skill Strength Calculation
export function calculateSkillStrength(vocabulary: Array<{ easeFactor: number; interval: number; nextReviewAt: Date }>): number {
  if (vocabulary.length === 0) return 1.0
  
  const now = new Date()
  let totalStrength = 0
  
  for (const word of vocabulary) {
    const daysOverdue = Math.max(0, (now.getTime() - word.nextReviewAt.getTime()) / (1000 * 60 * 60 * 24))
    // Strength decays based on how overdue the review is
    const wordStrength = Math.max(0, 1 - daysOverdue / (word.interval * 2))
    totalStrength += wordStrength
  }
  
  return totalStrength / vocabulary.length
}