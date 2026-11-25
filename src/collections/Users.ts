import type { CollectionConfig, Where } from 'payload'
import { adminOnly, appUser, isAppUser, isCMSAdmin } from '@/access/app-users'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { group: 'RemoteBPO Hub', useAsTitle: 'email' },
  access: {
    create: () => true,
    delete: adminOnly,
    read: ({ req }) => {
      if (isCMSAdmin(req)) return true
      if (appUser(req)?.role === 'admin') return true
      const publicEmployers: Where = {
        and: [{ role: { equals: 'employer' } }, { verified: { equals: true } }],
      }
      return isAppUser(req)
        ? ({ or: [{ id: { equals: req.user!.id } }, publicEmployers] } satisfies Where)
        : publicEmployers
    },
    update: ({ req }) => {
      if (isCMSAdmin(req) || appUser(req)?.role === 'admin') return true
      return isAppUser(req) ? { id: { equals: req.user!.id } } : false
    },
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === 'create' && !isCMSAdmin(req)) {
          data.role = data.role === 'employer' ? 'employer' : 'candidate'
          data.verified = false
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'displayName', type: 'text', required: true, maxLength: 80 },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'candidate',
      saveToJWT: true,
      options: ['candidate', 'employer', 'admin'],
      access: { update: ({ req }) => isCMSAdmin(req) },
    },
    { name: 'companyName', type: 'text', maxLength: 120 },
    { name: 'headline', type: 'text', maxLength: 140 },
    { name: 'location', type: 'text', maxLength: 100 },
    { name: 'bio', type: 'textarea', maxLength: 1000 },
    { name: 'tools', type: 'text', hasMany: true, maxRows: 20 },
    {
      name: 'languages',
      type: 'array',
      maxRows: 10,
      fields: [
        { name: 'code', type: 'text', required: true, maxLength: 12 },
        {
          name: 'proficiency',
          type: 'select',
          required: true,
          options: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'native'],
        },
      ],
    },
    { name: 'availability', type: 'text', hasMany: true, maxRows: 21 },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
      saveToJWT: true,
      access: {
        create: ({ req }) => isCMSAdmin(req),
        update: ({ req }) => isCMSAdmin(req) || appUser(req)?.role === 'admin',
      },
    },
    { name: 'savedJobs', type: 'relationship', relationTo: 'jobs', hasMany: true },
  ],
}
