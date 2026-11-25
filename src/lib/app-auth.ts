import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'
import type { NextRequest } from 'next/server'

const appUserCollection = 'users' as const
export const appSessionCookie = 'app-session'

export async function getAppUser(request: NextRequest) {
  const token = request.cookies.get(appSessionCookie)?.value
  if (!token) return null
  const payload = await getPayload({ config })
  const authHeaders = new Headers({ Authorization: `JWT ${token}` })
  const { user } = await payload.auth({ headers: authHeaders })
  if (!user || user.collection !== appUserCollection) return null
  return user
}

export async function loginAppUser(email: string, password: string) {
  const payload = await getPayload({ config })
  return payload.login({
    collection: appUserCollection,
    overrideAccess: false,
    data: { email, password },
  })
}

export async function registerAppUser(data: {
  companyName?: string
  displayName: string
  email: string
  password: string
  role: 'candidate' | 'employer'
}) {
  const payload = await getPayload({ config })
  await payload.create({
    collection: appUserCollection,
    overrideAccess: false,
    data,
  })
  return loginAppUser(data.email, data.password)
}
