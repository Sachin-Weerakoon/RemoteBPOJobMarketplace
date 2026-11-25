import type { CollectionConfig, Where } from 'payload'
import { appUser, candidateOnly, isAppUser, isCMSAdmin } from '@/access/app-users'

export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'jobTitle',
    defaultColumns: ['candidateName', 'jobTitle', 'status', 'createdAt'],
  },
  access: {
    create: candidateOnly,
    delete: ({ req }) => isCMSAdmin(req),
    read: ({ req }) => {
      if (isCMSAdmin(req)) return true
      if (!isAppUser(req)) return false
      return appUser(req)?.role === 'employer'
        ? ({ employer: { equals: req.user!.id } } as Where)
        : ({ candidate: { equals: req.user!.id } } as Where)
    },
    update: ({ req }) => {
      if (isCMSAdmin(req)) return true
      return appUser(req)?.role === 'employer'
        ? ({ employer: { equals: req.user!.id } } as Where)
        : false
    },
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (!data || operation !== 'create' || req.user?.collection !== 'users') return data
        const jobID = typeof data?.job === 'object' ? data.job.id : data?.job
        const job = await req.payload.findByID({
          collection: 'jobs',
          id: jobID,
          overrideAccess: false,
          user: req.user,
          req,
        })
        data.candidate = req.user.id
        data.candidateName = req.user.displayName
        data.employer = typeof job.employer === 'object' ? job.employer.id : job.employer
        data.jobTitle = job.title
        data.companyName = job.companyName
        return data
      },
    ],
    beforeChange: [
      ({ data, operation, originalDoc }) => {
        if (operation !== 'update' || !data.status || data.status === originalDoc.status)
          return data
        const transitions: Record<string, string[]> = {
          applied: ['under_review', 'rejected', 'withdrawn'],
          under_review: ['assessment', 'rejected', 'withdrawn'],
          assessment: ['interview', 'rejected', 'withdrawn'],
          interview: ['offer', 'rejected', 'withdrawn'],
          offer: ['hired', 'rejected', 'withdrawn'],
          hired: [],
          rejected: [],
          withdrawn: [],
        }
        if (!transitions[originalDoc.status]?.includes(data.status)) {
          throw new Error('That application transition is not allowed.')
        }
        return data
      },
    ],
  },
  indexes: [{ fields: ['candidate', 'job'], unique: true }],
  fields: [
    { name: 'candidate', type: 'relationship', relationTo: 'users', required: true, index: true },
    { name: 'candidateName', type: 'text', required: true },
    { name: 'employer', type: 'relationship', relationTo: 'users', required: true, index: true },
    { name: 'job', type: 'relationship', relationTo: 'jobs', required: true, index: true },
    { name: 'jobTitle', type: 'text', required: true },
    { name: 'companyName', type: 'text', required: true },
    { name: 'coverNote', type: 'textarea', maxLength: 1500 },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'applied',
      options: [
        'applied',
        'under_review',
        'assessment',
        'interview',
        'offer',
        'hired',
        'rejected',
        'withdrawn',
      ],
    },
  ],
}
