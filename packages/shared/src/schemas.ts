import { z } from 'zod'
import { APPLICATION_STATUSES, CEFR_LEVELS, PROCESS_TYPES, USER_ROLES } from './constants.ts'

export const userRoleSchema = z.enum(USER_ROLES)
export const processTypeSchema = z.enum(PROCESS_TYPES)
export const applicationStatusSchema = z.enum(APPLICATION_STATUSES)
export const proficiencySchema = z.enum(CEFR_LEVELS)

export const languageRequirementSchema = z.object({
  code: z.string().trim().min(2).max(12),
  minProficiency: proficiencySchema,
})

export const candidateLanguageSchema = z.object({
  code: z.string().trim().min(2).max(12),
  proficiency: proficiencySchema,
})

export const timeWindowSchema = z.object({
  startMinute: z.number().int().min(0).max(1439),
  endMinute: z.number().int().min(1).max(1440),
})

export const compatibilityInputSchema = z.object({
  requiredLanguages: z.array(languageRequirementSchema),
  candidateLanguages: z.array(candidateLanguageSchema),
  requiredTools: z.array(z.string()),
  candidateTools: z.array(z.string()),
  shift: timeWindowSchema,
  availability: z.array(timeWindowSchema),
})

export const typingSubmissionSchema = z.object({
  correctCharacters: z.number().int().nonnegative(),
  typedCharacters: z.number().int().positive(),
  elapsedSeconds: z.number().positive().max(3600),
})

export type CompatibilityInput = z.infer<typeof compatibilityInputSchema>
