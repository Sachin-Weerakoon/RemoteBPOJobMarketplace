import type { Access, PayloadRequest } from 'payload'
import type { User } from '@/payload-types'

export const isCMSAdmin = (req: PayloadRequest) => req.user?.collection === 'admins'
export const isAppUser = (req: PayloadRequest) => req.user?.collection === 'users'
export const appUser = (req: PayloadRequest) =>
  (isAppUser(req) ? req.user : null) as (User & { collection: 'users' }) | null

export const adminOrSelf: Access = ({ req }) => {
  if (isCMSAdmin(req)) return true
  if (!isAppUser(req)) return false
  return { id: { equals: req.user!.id } }
}

export const adminOnly: Access = ({ req }) => isCMSAdmin(req)

export const employerOnly: Access = ({ req }) => appUser(req)?.role === 'employer'

export const candidateOnly: Access = ({ req }) => appUser(req)?.role === 'candidate'
