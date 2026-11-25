import type { CollectionConfig } from 'payload'
import { candidateOnly, isAppUser, isCMSAdmin } from '@/access/app-users'

export const TypingResults: CollectionConfig = {
  slug: 'typing-results',
  admin: { useAsTitle: 'candidate' },
  access: {
    create: candidateOnly,
    delete: ({ req }) => isCMSAdmin(req),
    read: ({ req }) => {
      if (isCMSAdmin(req)) return true
      return isAppUser(req) ? { candidate: { equals: req.user!.id } } : false
    },
    update: () => false,
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === 'create' && req.user?.collection === 'users') {
          data.candidate = req.user.id
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'candidate', type: 'relationship', relationTo: 'users', required: true, unique: true },
    { name: 'wpm', type: 'number', required: true, min: 0, max: 200 },
    { name: 'accuracy', type: 'number', required: true, min: 0, max: 100 },
    { name: 'completedAt', type: 'date', required: true },
  ],
}
