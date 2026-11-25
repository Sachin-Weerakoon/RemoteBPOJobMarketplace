import config from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { appSessionCookie, getAppUser, loginAppUser, registerAppUser } from '@/lib/app-auth'
import type { Application, Job, Profile } from '@/lib/app-types'

export const dynamic = 'force-dynamic'
type Context = { params: Promise<{ path: string[] }> }

const cleanText = (value: unknown, max = 500) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''
const jsonError = (error: string, status: number) => Response.json({ error }, { status })
const relationshipID = (value: any) => (typeof value === 'object' ? value.id : value)

function toProfile(user: any): Profile {
  return {
    id: String(user.id),
    email: user.email,
    role: user.role,
    displayName: user.displayName,
    companyName: user.companyName,
    headline: user.headline,
    location: user.location,
    bio: user.bio,
    tools: user.tools ?? [],
    languages: user.languages ?? [],
    availability: user.availability ?? [],
    verified: Boolean(user.verified),
  }
}

function toJob(doc: any): Job {
  return {
    id: String(doc.id),
    slug: doc.slug,
    employerId: String(relationshipID(doc.employer)),
    companyName: doc.companyName,
    companyVerified: typeof doc.employer === 'object' ? Boolean(doc.employer.verified) : false,
    title: doc.title,
    process: doc.process,
    mode: doc.mode,
    location: doc.location,
    shift: doc.shift || '',
    salary: doc.salary || '',
    language: doc.language || '',
    tools: doc.tools ?? [],
    description: doc.description,
    status: doc.status,
    createdAt: doc.createdAt,
  }
}

function toApplication(doc: any): Application {
  return {
    id: String(doc.id),
    candidateId: String(relationshipID(doc.candidate)),
    candidateName: doc.candidateName,
    employerId: String(relationshipID(doc.employer)),
    jobId: String(relationshipID(doc.job)),
    jobTitle: doc.jobTitle,
    companyName: doc.companyName,
    coverNote: doc.coverNote || '',
    status: doc.status,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
}

async function auth(request: NextRequest, roles?: string[]) {
  const user = await getAppUser(request)
  if (!user) return { response: jsonError('Authentication required.', 401) }
  if (roles && !roles.includes(user.role)) {
    return { response: jsonError('You do not have access to this resource.', 403) }
  }
  return { user }
}

async function requestBody(request: NextRequest) {
  try {
    return (await request.json()) as Record<string, any>
  } catch {
    return {}
  }
}

function authenticatedResponse(profile: Profile, token: string, status = 200) {
  const response = NextResponse.json({ profile }, { status })
  response.cookies.set(appSessionCookie, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  return response
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const payload = await getPayload({ config })
    const path = (await context.params).path.join('/')
    if (path === 'health') return Response.json({ status: 'ok', storage: 'payload' })
    if (path === 'me') {
      const guard = await auth(request)
      return guard.response ?? Response.json({ profile: toProfile(guard.user) })
    }
    if (path === 'jobs') {
      const result = await payload.find({
        collection: 'jobs',
        depth: 1,
        limit: 100,
        overrideAccess: false,
        sort: '-createdAt',
      })
      return Response.json({ jobs: result.docs.map(toJob) })
    }
    if (path.startsWith('jobs/')) {
      const result = await payload.find({
        collection: 'jobs',
        depth: 1,
        limit: 1,
        overrideAccess: false,
        where: { slug: { equals: path.slice(5) } },
      })
      return result.docs[0]
        ? Response.json({ job: toJob(result.docs[0]) })
        : jsonError('Job not found.', 404)
    }
    if (path === 'companies') {
      const result = await payload.find({
        collection: 'users',
        limit: 100,
        overrideAccess: false,
        where: {
          and: [{ role: { equals: 'employer' } }, { verified: { equals: true } }],
        },
      })
      return Response.json({
        companies: result.docs.map((user: any) => ({
          id: String(user.id),
          name: user.companyName || user.displayName,
          location: user.location || 'Remote',
          bio: user.bio || '',
          verified: true,
        })),
      })
    }
    if (path === 'candidate/saved') {
      const guard = await auth(request, ['candidate'])
      if (guard.response) return guard.response
      const ids = (guard.user.savedJobs ?? []).map(relationshipID)
      if (!ids.length) return Response.json({ jobs: [] })
      const result = await payload.find({
        collection: 'jobs',
        depth: 1,
        limit: 100,
        overrideAccess: false,
        user: guard.user,
        where: { id: { in: ids } },
      })
      return Response.json({ jobs: result.docs.map(toJob) })
    }
    if (path === 'candidate/typing') {
      const guard = await auth(request, ['candidate'])
      if (guard.response) return guard.response
      const result = await payload.find({
        collection: 'typing-results',
        limit: 1,
        overrideAccess: false,
        user: guard.user,
      })
      const doc: any = result.docs[0]
      return Response.json({
        result: doc
          ? { id: doc.id, wpm: doc.wpm, accuracy: doc.accuracy, completedAt: doc.completedAt }
          : null,
      })
    }
    if (path === 'applications') {
      const guard = await auth(request, ['candidate'])
      if (guard.response) return guard.response
      const result = await payload.find({
        collection: 'applications',
        depth: 0,
        limit: 100,
        overrideAccess: false,
        sort: '-createdAt',
        user: guard.user,
      })
      return Response.json({ applications: result.docs.map(toApplication) })
    }
    if (path === 'employer/jobs') {
      const guard = await auth(request, ['employer'])
      if (guard.response) return guard.response
      const result = await payload.find({
        collection: 'jobs',
        depth: 1,
        limit: 100,
        overrideAccess: false,
        sort: '-createdAt',
        user: guard.user,
        where: { employer: { equals: guard.user.id } },
      })
      return Response.json({ jobs: result.docs.map(toJob) })
    }
    if (path === 'employer/applications') {
      const guard = await auth(request, ['employer'])
      if (guard.response) return guard.response
      const result = await payload.find({
        collection: 'applications',
        depth: 0,
        limit: 100,
        overrideAccess: false,
        sort: '-createdAt',
        user: guard.user,
      })
      return Response.json({ applications: result.docs.map(toApplication) })
    }
    if (path === 'operations/employers') {
      const guard = await auth(request, ['admin'])
      if (guard.response) return guard.response
      const result = await payload.find({
        collection: 'users',
        limit: 100,
        overrideAccess: false,
        user: guard.user,
        where: { role: { equals: 'employer' } },
      })
      return Response.json({ employers: result.docs.map(toProfile) })
    }
    return jsonError('Endpoint not found.', 404)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(request: NextRequest, context: Context) {
  try {
    const payload = await getPayload({ config })
    const path = (await context.params).path.join('/')
    const data = await requestBody(request)
    if (path === 'auth/register') {
      const result = await registerAppUser({
        companyName: cleanText(data.companyName, 120),
        displayName: cleanText(data.displayName, 80),
        email: cleanText(data.email, 254),
        password: String(data.password || ''),
        role: data.role === 'employer' ? 'employer' : 'candidate',
      })
      if (!result.token || !result.user) return jsonError('Account could not be created.', 400)
      return authenticatedResponse(toProfile(result.user), result.token, 201)
    }
    if (path === 'auth/login') {
      const result = await loginAppUser(cleanText(data.email, 254), String(data.password || ''))
      if (!result.token || !result.user) return jsonError('Invalid email or password.', 401)
      return authenticatedResponse(toProfile(result.user), result.token)
    }
    if (path === 'auth/logout') {
      const response = NextResponse.json({ success: true })
      response.cookies.set(appSessionCookie, '', { httpOnly: true, maxAge: 0, path: '/' })
      return response
    }
    if (path.startsWith('candidate/saved/')) {
      const guard = await auth(request, ['candidate'])
      if (guard.response) return guard.response
      const jobId = path.slice('candidate/saved/'.length)
      const ids = (guard.user.savedJobs ?? []).map(relationshipID)
      const saved = ids.includes(jobId)
      const next = saved ? ids.filter((id: any) => String(id) !== jobId) : [...ids, jobId]
      await payload.update({
        collection: 'users',
        id: guard.user.id,
        overrideAccess: false,
        user: guard.user,
        data: { savedJobs: next },
      })
      return Response.json({ saved: !saved })
    }
    if (path === 'applications') {
      const guard = await auth(request, ['candidate'])
      if (guard.response) return guard.response
      const application = await payload.create({
        collection: 'applications',
        depth: 0,
        draft: false,
        overrideAccess: false,
        user: guard.user,
        data: { job: data.jobId, coverNote: cleanText(data.coverNote, 1500) } as any,
      })
      return Response.json({ application: toApplication(application) }, { status: 201 })
    }
    if (path === 'candidate/typing') {
      const guard = await auth(request, ['candidate'])
      if (guard.response) return guard.response
      const correct = Math.max(0, Number(data.correctCharacters) || 0)
      const typed = Math.max(0, Number(data.typedCharacters) || 0)
      const seconds = Math.max(0, Number(data.elapsedSeconds) || 0)
      const wpm = seconds ? Math.round((correct / 5 / (seconds / 60)) * 10) / 10 : 0
      const accuracy = typed ? Math.round((correct / typed) * 1000) / 10 : 0
      if (!typed || !seconds || correct > typed || wpm > 200) {
        return jsonError('Typing result is not valid.', 400)
      }
      const result: any = await payload.create({
        collection: 'typing-results',
        draft: false,
        overrideAccess: false,
        user: guard.user,
        data: {
          accuracy: Math.min(100, accuracy),
          completedAt: new Date().toISOString(),
          wpm,
        } as any,
      })
      return Response.json(
        { result: { id: result.id, wpm: result.wpm, accuracy: result.accuracy } },
        { status: 201 },
      )
    }
    if (path === 'employer/jobs') {
      const guard = await auth(request, ['employer'])
      if (guard.response) return guard.response
      const job = await payload.create({
        collection: 'jobs',
        depth: 1,
        draft: false,
        overrideAccess: false,
        user: guard.user,
        data: {
          description: cleanText(data.description, 4000),
          language: cleanText(data.language, 80),
          location: cleanText(data.location, 100) || 'Remote',
          mode: data.mode,
          process: data.process,
          salary: cleanText(data.salary, 100),
          shift: cleanText(data.shift, 100),
          status: guard.user.verified && data.publish ? 'published' : 'draft',
          title: cleanText(data.title, 120),
          tools: Array.isArray(data.tools) ? data.tools.slice(0, 20) : [],
        } as any,
      })
      return Response.json({ job: toJob(job) }, { status: 201 })
    }
    return jsonError('Endpoint not found.', 404)
  } catch (error) {
    return handleError(error)
  }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    const path = (await context.params).path.join('/')
    if (path !== 'me') return jsonError('Endpoint not found.', 404)
    const guard = await auth(request)
    if (guard.response) return guard.response
    const data = await requestBody(request)
    const payload = await getPayload({ config })
    const user = await payload.update({
      collection: 'users',
      id: guard.user.id,
      overrideAccess: false,
      user: guard.user,
      data: {
        bio: cleanText(data.bio, 1000),
        companyName: cleanText(data.companyName, 120) || undefined,
        displayName: cleanText(data.displayName, 80),
        headline: cleanText(data.headline, 140),
        location: cleanText(data.location, 100),
        tools: Array.isArray(data.tools) ? data.tools.slice(0, 20) : undefined,
      },
    })
    return Response.json({ profile: toProfile(user) })
  } catch (error) {
    return handleError(error)
  }
}

export async function PATCH(request: NextRequest, context: Context) {
  try {
    const payload = await getPayload({ config })
    const path = (await context.params).path.join('/')
    const data = await requestBody(request)
    if (path.startsWith('employer/jobs/')) {
      const guard = await auth(request, ['employer'])
      if (guard.response) return guard.response
      if (data.status === 'published' && !guard.user.verified) {
        return jsonError('Employer verification is required before publication.', 403)
      }
      const job = await payload.update({
        collection: 'jobs',
        id: path.slice('employer/jobs/'.length),
        depth: 1,
        overrideAccess: false,
        user: guard.user,
        data: { status: data.status },
      })
      return Response.json({ job: toJob(job) })
    }
    if (path.startsWith('employer/applications/')) {
      const guard = await auth(request, ['employer'])
      if (guard.response) return guard.response
      const application = await payload.update({
        collection: 'applications',
        id: path.slice('employer/applications/'.length),
        depth: 0,
        overrideAccess: false,
        user: guard.user,
        data: { status: data.status },
      })
      return Response.json({ application: toApplication(application) })
    }
    if (path.startsWith('operations/employers/')) {
      const guard = await auth(request, ['admin'])
      if (guard.response) return guard.response
      const profile = await payload.update({
        collection: 'users',
        id: path.slice('operations/employers/'.length),
        overrideAccess: false,
        user: guard.user,
        data: { verified: Boolean(data.verified) },
      })
      return Response.json({ profile: toProfile(profile) })
    }
    return jsonError('Endpoint not found.', 404)
  } catch (error) {
    return handleError(error)
  }
}

function handleError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Backend request failed.'
  const status = /invalid login|email or password/i.test(message) ? 401 : 400
  return jsonError(message, status)
}
