export const USER_ROLES = ['candidate', 'employer', 'admin'] as const

export const PROCESS_TYPES = [
  'voice',
  'non_voice',
  'tech_support',
  'data_entry',
  'content_moderation',
  'healthcare_bpo',
  'finance_bpo',
  'customer_service',
  'other',
] as const

export const APPLICATION_STATUSES = [
  'applied',
  'under_review',
  'assessment',
  'interview',
  'offer',
  'hired',
  'rejected',
  'withdrawn',
] as const

export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'native'] as const

export const APPLICATION_TRANSITIONS: Record<
  (typeof APPLICATION_STATUSES)[number],
  readonly (typeof APPLICATION_STATUSES)[number][]
> = {
  applied: ['under_review', 'rejected', 'withdrawn'],
  under_review: ['assessment', 'rejected', 'withdrawn'],
  assessment: ['interview', 'rejected', 'withdrawn'],
  interview: ['offer', 'rejected', 'withdrawn'],
  offer: ['hired', 'rejected', 'withdrawn'],
  hired: [],
  rejected: [],
  withdrawn: [],
}
