import type { CompatibilityInput } from './schemas.ts'
import { APPLICATION_TRANSITIONS, CEFR_LEVELS } from './constants.ts'

const normalize = (value: string) => value.trim().toLocaleLowerCase()

const proficiencyRank = new Map(CEFR_LEVELS.map((level, index) => [level, index]))

function languageRatio(input: CompatibilityInput) {
  if (input.requiredLanguages.length === 0) return 1

  const candidateLanguages = new Map(
    input.candidateLanguages.map((language) => [
      normalize(language.code),
      proficiencyRank.get(language.proficiency) ?? 0,
    ]),
  )

  const met = input.requiredLanguages.filter((requirement) => {
    const actual = candidateLanguages.get(normalize(requirement.code))
    const required = proficiencyRank.get(requirement.minProficiency) ?? 0
    return actual !== undefined && actual >= required
  }).length

  return met / input.requiredLanguages.length
}

function toolsRatio(input: CompatibilityInput) {
  if (input.requiredTools.length === 0) return 1
  const candidateTools = new Set(input.candidateTools.map(normalize))
  const matched = input.requiredTools.filter((tool) => candidateTools.has(normalize(tool))).length
  return matched / input.requiredTools.length
}

function shiftRatio(input: CompatibilityInput) {
  const shiftLength = input.shift.endMinute - input.shift.startMinute
  if (shiftLength <= 0) return 0

  const overlap = input.availability.reduce((total, window) => {
    const start = Math.max(input.shift.startMinute, window.startMinute)
    const end = Math.min(input.shift.endMinute, window.endMinute)
    return total + Math.max(0, end - start)
  }, 0)

  return Math.min(1, overlap / shiftLength)
}

export function calculateCompatibility(input: CompatibilityInput) {
  const language = languageRatio(input)
  const tools = toolsRatio(input)
  const shift = shiftRatio(input)
  const score = Math.round(language * 40 + tools * 35 + shift * 25)

  return {
    score,
    breakdown: {
      language: Math.round(language * 40),
      tools: Math.round(tools * 35),
      shift: Math.round(shift * 25),
    },
  }
}

export function calculateTypingScore(input: {
  correctCharacters: number
  typedCharacters: number
  elapsedSeconds: number
}) {
  if (input.typedCharacters <= 0 || input.elapsedSeconds <= 0) {
    return { accuracy: 0, valid: false, wpm: 0 }
  }

  const minutes = input.elapsedSeconds / 60
  const wpm = Math.round((input.correctCharacters / 5 / minutes) * 10) / 10
  const accuracy = Math.round((input.correctCharacters / input.typedCharacters) * 1000) / 10

  return {
    accuracy: Math.min(100, accuracy),
    valid:
      input.correctCharacters <= input.typedCharacters && input.elapsedSeconds >= 1 && wpm <= 200,
    wpm,
  }
}

export function canTransitionApplication(
  from: keyof typeof APPLICATION_TRANSITIONS,
  to: keyof typeof APPLICATION_TRANSITIONS,
) {
  return APPLICATION_TRANSITIONS[from].includes(to)
}
