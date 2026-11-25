import type { CollectionConfig, Where } from 'payload'
import { appUser, employerOnly, isAppUser, isCMSAdmin } from '@/access/app-users'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'companyName', 'status', 'createdAt'] },
  access: {
    create: employerOnly,
    delete: ({ req }) => {
      if (isCMSAdmin(req)) return true
      return isAppUser(req) ? { employer: { equals: req.user!.id } } : false
    },
    read: ({ req }) => {
      if (isCMSAdmin(req)) return true
      if (appUser(req)?.role === 'employer') {
        return {
          or: [{ status: { equals: 'published' } }, { employer: { equals: req.user!.id } }],
        } as Where
      }
      return { status: { equals: 'published' } } as Where
    },
    update: ({ req }) => {
      if (isCMSAdmin(req)) return true
      return isAppUser(req) ? { employer: { equals: req.user!.id } } : false
    },
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === 'create' && req.user?.collection === 'users') {
          data.employer = req.user.id
          data.companyName = req.user.companyName || req.user.displayName
        }
        if (req.user?.collection === 'users' && !req.user.verified) data.status = 'draft'
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 120 },
    { name: 'slug', type: 'slug', useAsSlug: 'title' },
    { name: 'employer', type: 'relationship', relationTo: 'users', required: true, index: true },
    { name: 'companyName', type: 'text', required: true },
    {
      name: 'process',
      type: 'select',
      required: true,
      options: [
        'voice',
        'non_voice',
        'tech_support',
        'data_entry',
        'content_moderation',
        'healthcare_bpo',
        'finance_bpo',
        'customer_service',
        'other',
      ],
    },
    {
      name: 'mode',
      type: 'select',
      required: true,
      options: ['Full time', 'Part time', 'Contract'],
    },
    { name: 'location', type: 'text', required: true },
    { name: 'shift', type: 'text' },
    { name: 'salary', type: 'text' },
    { name: 'language', type: 'text' },
    { name: 'tools', type: 'text', hasMany: true, maxRows: 20 },
    { name: 'description', type: 'textarea', required: true, maxLength: 4000 },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: ['draft', 'published'],
    },
  ],
}
