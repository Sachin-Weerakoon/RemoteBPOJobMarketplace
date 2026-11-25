'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, ShieldAlert, Users } from 'lucide-react'
import { WorkspaceHeader } from '@/components/layout/workspace-header'
import { Alert, EmptyState, MetricCard, Skeleton } from '@/components/ui/display'
import { StatusChip } from '@/components/ui/core'
import { apiRequest } from '@/lib/api-client'
import type { Application, Job, Profile } from '@/lib/app-types'
import { useWorkspace } from '@/components/workspace/workspace-provider'

export function EmployerDashboard() {
  const { profile } = useWorkspace()
  const [data, setData] = useState<{ jobs: Job[]; applications: Application[] } | null>(null)
  useEffect(() => {
    Promise.all([
      apiRequest<{ jobs: Job[] }>('/employer/jobs'),
      apiRequest<{ applications: Application[] }>('/employer/applications'),
    ]).then(([jobs, applications]) =>
      setData({ jobs: jobs.jobs, applications: applications.applications }),
    )
  }, [])
  return (
    <WorkspacePage>
      <WorkspaceHeader
        action={
          <Link
            className="inline-flex min-h-11 items-center rounded-lg bg-brand-lime px-4 text-sm font-bold text-brand-ink"
            href="/employer/jobs"
          >
            Post a job
          </Link>
        }
        description="Monitor your open roles and move qualified candidates forward."
        title={profile.companyName || profile.displayName}
      />
      {!profile.verified && (
        <div className="mt-6">
          <Alert tone="warning">
            <b>Verification pending.</b> Complete your company profile. Jobs remain drafts until the
            trust team approves your employer account.
          </Alert>
        </div>
      )}
      {!data ? (
        <Skeleton className="mt-8 h-44" />
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Total jobs"
              note="Draft and published"
              value={String(data.jobs.length)}
            />
            <MetricCard
              label="Applicants"
              note="Across all roles"
              value={String(data.applications.length)}
            />
            <MetricCard
              label="Interviews"
              note="Candidates in interview"
              value={String(data.applications.filter((item) => item.status === 'interview').length)}
            />
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Summary title="Active jobs">
              {data.jobs.length ? (
                data.jobs.slice(0, 5).map((job) => (
                  <div
                    className="flex items-center justify-between border-t border-brand-line py-3 first:border-0"
                    key={job.id}
                  >
                    <div>
                      <b className="text-sm text-brand-ink">{job.title}</b>
                      <p className="text-xs text-brand-muted">{job.mode}</p>
                    </div>
                    <StatusChip>{job.status}</StatusChip>
                  </div>
                ))
              ) : (
                <p className="text-sm text-brand-muted">
                  Create your first role to start building a pipeline.
                </p>
              )}
            </Summary>
            <Summary title="Recent applicants">
              {data.applications.length ? (
                data.applications.slice(0, 5).map((application) => (
                  <div
                    className="flex items-center justify-between border-t border-brand-line py-3 first:border-0"
                    key={application.id}
                  >
                    <div>
                      <b className="text-sm text-brand-ink">{application.candidateName}</b>
                      <p className="text-xs text-brand-muted">{application.jobTitle}</p>
                    </div>
                    <StatusChip>{application.status.replaceAll('_', ' ')}</StatusChip>
                  </div>
                ))
              ) : (
                <p className="text-sm text-brand-muted">
                  Applicants appear here after candidates apply.
                </p>
              )}
            </Summary>
          </div>
        </>
      )}
    </WorkspacePage>
  )
}

export function EmployerJobs() {
  const { profile } = useWorkspace()
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [message, setMessage] = useState('')
  const load = () =>
    apiRequest<{ jobs: Job[] }>('/employer/jobs').then((data) => setJobs(data.jobs))
  useEffect(() => {
    load()
  }, [])
  async function setPublication(job: Job, status: 'draft' | 'published') {
    try {
      await apiRequest(`/employer/jobs/${job.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      setMessage(status === 'published' ? 'Job published.' : 'Job returned to draft.')
      await load()
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : 'Could not update publication.')
    }
  }
  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    try {
      const response = await apiRequest<{ job: Job }>('/employer/jobs', {
        method: 'POST',
        body: JSON.stringify({
          title: data.get('title'),
          process: data.get('process'),
          mode: data.get('mode'),
          location: data.get('location'),
          shift: data.get('shift'),
          salary: data.get('salary'),
          language: data.get('language'),
          tools: String(data.get('tools') || '')
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
          description: data.get('description'),
          publish: data.get('publish') === 'on',
        }),
      })
      setMessage(response.job.status === 'published' ? 'Job published.' : 'Job saved as a draft.')
      form.reset()
      await load()
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : 'Could not create job.')
    }
  }
  return (
    <WorkspacePage>
      <WorkspaceHeader
        description="Create clear, transparent roles and manage their publication state."
        title="My jobs"
      />
      <div className="mt-8 grid gap-7 xl:grid-cols-[1fr_420px]">
        <section>
          {!jobs ? (
            <Skeleton className="h-72" />
          ) : jobs.length ? (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <article
                  className="rounded-xl border border-brand-line bg-white p-5 shadow-card"
                  key={job.id}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-bold text-brand-ink">{job.title}</h2>
                      <p className="mt-1 text-sm text-brand-muted">
                        {job.process.replaceAll('_', ' ')} · {job.mode}
                      </p>
                    </div>
                    <StatusChip>{job.status}</StatusChip>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {job.status === 'published' && (
                      <Link
                        className="inline-flex items-center gap-2 text-sm font-bold text-brand-green"
                        href={`/jobs/${job.slug}`}
                      >
                        View public role <ArrowRight size={15} />
                      </Link>
                    )}
                    <button
                      className="min-h-10 rounded-lg border border-brand-line px-3 text-xs font-bold text-brand-ink disabled:opacity-50"
                      disabled={job.status === 'draft' && !profile.verified}
                      onClick={() =>
                        setPublication(job, job.status === 'published' ? 'draft' : 'published')
                      }
                      type="button"
                    >
                      {job.status === 'published' ? 'Return to draft' : 'Publish role'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              description="Use the form to define your first role. Unverified employers can save drafts."
              title="No jobs created"
            />
          )}
        </section>
        <form
          className="h-fit rounded-2xl border border-brand-line bg-white p-6 shadow-card"
          onSubmit={create}
        >
          <h2 className="text-xl font-bold text-brand-ink">Create a role</h2>
          <div className="mt-5 grid gap-4">
            <TextInput label="Job title" name="title" required />
            <SelectInput
              label="Process"
              name="process"
              options={[
                'customer_service',
                'tech_support',
                'data_entry',
                'content_moderation',
                'other',
              ]}
            />
            <SelectInput
              label="Employment"
              name="mode"
              options={['Full time', 'Part time', 'Contract']}
            />
            <TextInput label="Location" name="location" placeholder="Remote" />
            <TextInput label="Shift" name="shift" placeholder="09:00–17:00 UTC" />
            <TextInput label="Compensation" name="salary" placeholder="Transparent range" />
            <TextInput label="Language requirement" name="language" placeholder="English · B2" />
            <TextInput label="Tools, separated by commas" name="tools" />
            <label className="grid gap-2 text-sm font-bold text-brand-ink">
              Description
              <textarea
                className="min-h-36 rounded-lg border border-brand-line bg-brand-soft p-3 font-normal outline-none focus:border-brand-lime"
                name="description"
                required
              />
            </label>
            <label className="flex min-h-11 items-center gap-3 text-sm font-bold text-brand-ink">
              <input
                className="size-4 accent-brand-lime"
                disabled={!profile.verified}
                name="publish"
                type="checkbox"
              />
              Publish immediately
            </label>
            <button className="min-h-11 rounded-lg bg-brand-lime px-5 text-sm font-bold text-brand-ink">
              Save role
            </button>
            <p aria-live="polite" className="text-sm text-brand-muted">
              {message}
            </p>
          </div>
        </form>
      </div>
    </WorkspacePage>
  )
}

const nextStatuses: Record<string, string[]> = {
  applied: ['under_review', 'rejected'],
  under_review: ['assessment', 'rejected'],
  assessment: ['interview', 'rejected'],
  interview: ['offer', 'rejected'],
  offer: ['hired', 'rejected'],
  hired: [],
  rejected: [],
}

export function EmployerApplicants() {
  const [applications, setApplications] = useState<Application[] | null>(null)
  const [error, setError] = useState('')
  const load = () =>
    apiRequest<{ applications: Application[] }>('/employer/applications').then((data) =>
      setApplications(data.applications),
    )
  useEffect(() => {
    load()
  }, [])
  async function move(application: Application, status: string) {
    try {
      await apiRequest(`/employer/applications/${application.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      await load()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not update application.')
    }
  }
  return (
    <WorkspacePage>
      <WorkspaceHeader
        description="Review candidates and advance them through a controlled hiring workflow."
        title="Applicant pipeline"
      />
      {error && (
        <div className="mt-5">
          <Alert tone="error">{error}</Alert>
        </div>
      )}
      {!applications ? (
        <Skeleton className="mt-8 h-72" />
      ) : applications.length ? (
        <div className="mt-8 grid gap-4">
          {applications.map((application) => (
            <article
              className="rounded-xl border border-brand-line bg-white p-5 shadow-card"
              key={application.id}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-ink font-bold text-brand-lime">
                  {application.candidateName
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-brand-ink">{application.candidateName}</h2>
                  <p className="text-sm text-brand-muted">
                    {application.jobTitle} · Applied{' '}
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                  {application.coverNote && (
                    <p className="mt-3 text-sm leading-6 text-brand-muted">
                      {application.coverNote}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusChip>{application.status.replaceAll('_', ' ')}</StatusChip>
                  {nextStatuses[application.status]?.map((status) => (
                    <button
                      className={`min-h-10 rounded-lg px-3 text-xs font-bold ${status === 'rejected' ? 'border border-red-200 text-brand-danger' : 'bg-brand-lime text-brand-ink'}`}
                      key={status}
                      onClick={() => move(application, status)}
                      type="button"
                    >
                      {status.replaceAll('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            description="New applications will appear here and can be advanced through review, assessment, interview, offer, and hire."
            title="No applicants yet"
          />
        </div>
      )}
    </WorkspacePage>
  )
}

export function EmployerCompany() {
  const { profile, refreshProfile } = useWorkspace()
  const [message, setMessage] = useState('')
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      await apiRequest<{ profile: Profile }>('/me', {
        method: 'PUT',
        body: JSON.stringify({
          displayName: form.get('displayName'),
          companyName: form.get('companyName'),
          location: form.get('location'),
          bio: form.get('bio'),
        }),
      })
      await refreshProfile()
      setMessage('Company profile saved.')
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : 'Could not save company.')
    }
  }
  return (
    <WorkspacePage>
      <WorkspaceHeader
        description="Maintain the public information candidates use to evaluate your company."
        title="Company profile"
      />
      <div className="mt-6">
        <Alert tone={profile.verified ? 'success' : 'warning'}>
          {profile.verified
            ? 'Your company is verified and eligible to publish roles.'
            : 'Your company is awaiting trust verification. Keep these details complete and accurate.'}
        </Alert>
      </div>
      <form
        className="mt-6 grid gap-5 rounded-2xl border border-brand-line bg-white p-6 shadow-card"
        onSubmit={save}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            defaultValue={profile.companyName}
            label="Company name"
            name="companyName"
            required
          />
          <TextInput
            defaultValue={profile.displayName}
            label="Primary contact"
            name="displayName"
            required
          />
          <TextInput
            defaultValue={profile.location}
            label="Headquarters or operating region"
            name="location"
          />
        </div>
        <label className="grid gap-2 text-sm font-bold text-brand-ink">
          Company overview
          <textarea
            className="min-h-40 rounded-lg border border-brand-line bg-brand-soft p-3 font-normal outline-none focus:border-brand-lime"
            defaultValue={profile.bio}
            maxLength={1000}
            name="bio"
          />
        </label>
        <div className="flex items-center gap-4">
          <button className="min-h-11 rounded-lg bg-brand-lime px-5 text-sm font-bold text-brand-ink">
            Save company
          </button>
          <span aria-live="polite" className="text-sm text-brand-muted">
            {message}
          </span>
        </div>
      </form>
    </WorkspacePage>
  )
}

function WorkspacePage({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-7xl p-5 sm:p-8">{children}</main>
}
function Summary({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="rounded-xl border border-brand-line bg-white p-5 shadow-card">
      <h2 className="flex items-center gap-2 font-bold text-brand-ink">
        {title === 'Active jobs' ? <BriefcaseBusiness size={18} /> : <Users size={18} />}
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}
function TextInput({
  defaultValue,
  label,
  name,
  placeholder,
  required = false,
}: {
  defaultValue?: string
  label: string
  name: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-ink">
      {label}
      <input
        className="min-h-11 rounded-lg border border-brand-line bg-brand-soft px-3 font-normal outline-none focus:border-brand-lime"
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </label>
  )
}
function SelectInput({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-ink">
      {label}
      <select
        className="min-h-11 rounded-lg border border-brand-line bg-brand-soft px-3 font-normal outline-none focus:border-brand-lime"
        name={name}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replaceAll('_', ' ')}
          </option>
        ))}
      </select>
    </label>
  )
}
