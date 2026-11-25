import assert from 'node:assert/strict'
import test from 'node:test'
import {
  calculateCompatibility,
  calculateTypingScore,
  canTransitionApplication,
} from './scoring.ts'

test('compatibility applies the 40/35/25 weighting', () => {
  const result = calculateCompatibility({
    requiredLanguages: [{ code: 'en', minProficiency: 'B2' }],
    candidateLanguages: [{ code: 'EN', proficiency: 'C1' }],
    requiredTools: ['Zendesk', 'Slack'],
    candidateTools: ['zendesk'],
    shift: { startMinute: 540, endMinute: 1020 },
    availability: [{ startMinute: 540, endMinute: 780 }],
  })

  assert.deepEqual(result.breakdown, { language: 40, tools: 18, shift: 13 })
  assert.equal(result.score, 70)
})

test('typing score follows the five-character word standard', () => {
  assert.deepEqual(
    calculateTypingScore({
      correctCharacters: 500,
      typedCharacters: 520,
      elapsedSeconds: 120,
    }),
    { accuracy: 96.2, valid: true, wpm: 50 },
  )
})

test('typing score rejects impossible speeds', () => {
  assert.equal(
    calculateTypingScore({
      correctCharacters: 2000,
      typedCharacters: 2000,
      elapsedSeconds: 30,
    }).valid,
    false,
  )
})

test('application state transitions reject skips and terminal changes', () => {
  assert.equal(canTransitionApplication('applied', 'under_review'), true)
  assert.equal(canTransitionApplication('applied', 'offer'), false)
  assert.equal(canTransitionApplication('hired', 'rejected'), false)
})
