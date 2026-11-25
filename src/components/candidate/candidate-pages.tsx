'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  ClipboardCheck,
  FileCheck2,
  Heart,
  UserRound,
} from 'lucide-react'
import { WorkspaceHeader } from '@/components/layout/workspace-header'
import { Alert, EmptyState, MetricCard, Skeleton } from '@/components/ui/display'
import { StatusChip } from '@/components/ui/core'
import { JobCard } from '@/components/ui/job-card'
import { apiRequest } from '@/lib/api-client'
import type { Application, Job, Profile } from '@/lib/app-types'
import { useWorkspace } from '@/components/workspace/workspace-provider'

export function CandidateDashboard() {
  const { profile } = useWorkspace()
  const [data, setData] = useState<{
    applications: Application[]
    jobs: Job[]
    result: any
  } | null>(null)
  useEffect(() => {
    Promise.all([
      apiRequest<{ applications: Application[] }>('/applications'),
      apiRequest<{ jobs: Job[] }>('/candidate/saved'),
      apiRequest<{ result: any }>('/candidate/typing'),
    ]).then(([applications, saved, typing]) =>
      setData({ applications: applications.applications, jobs: saved.jobs, result: typing.result }),
    )
  }, [])
  return (
    <WorkspacePage>
      <WorkspaceHeader
        description="Your profile, applications, and saved opportunities in one place."
        title={`Welcome, ${profile.displayName.split(' ')[0]}`}
      />
      {!data ? (
        <Skeleton className="mt-8 h-40" />
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Applications"
              note="Across all active roles"
              value={String(data.applications.length)}
            />
            <MetricCard
              label="Saved roles"
              note="Ready when you are"
              value={String(data.jobs.length)}
            />
            <MetricCard
              label="Typing result"
              note={data.result ? `${data.result.accuracy}% accuracy` : 'Complete your assessment'}
              value={data.result ? `${data.result.wpm} WPM` : '—'}
            />
          </div>
          {!data.result && (
            <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-brand-ink p-6 text-white sm:flex-row sm:items-center">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-lime text-brand-ink">
                <ClipboardCheck size={20} />
              </span>
              <div className="flex-1">
                <h2 className="font-bold">Add a verified typing result</h2>
                <p className="mt-1 text-sm text-brand-cool">
                  Help employers understand your speed and accuracy.
                </p>
              </div>
              <Link
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-lime px-4 text-sm font-bold text-brand-ink"
                href="/candidate/assessment"
              >
                Start assessment <ArrowRight size={16} />
              </Link>
            </div>
          )}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <SummaryPanel icon={<FileCheck2 size={19} />} title="Recent applications">
              {data.applications.length ? (
                data.applications.slice(0, 4).map((application) => (
                  <div
                    className="flex items-center justify-between gap-3 border-t border-brand-line py-3 first:border-0"
                    key={application.id}
                  >
                    <div>
                      <b className="text-sm text-brand-ink">{application.jobTitle}</b>
                      <p className="text-xs text-brand-muted">{application.companyName}</p>
                    </div>
                    <StatusChip>{application.status.replaceAll('_', ' ')}</StatusChip>
                  </div>
                ))
              ) : (
                <p className="text-sm text-brand-muted">No applications yet.</p>
              )}
            </SummaryPanel>
            <SummaryPanel icon={<Heart size={19} />} title="Saved roles">
              {data.jobs.length ? (
                data.jobs.slice(0, 4).map((job) => (
                  <Link
                    className="flex items-center justify-between border-t border-brand-line py-3 text-sm font-bold text-brand-ink first:border-0 hover:text-brand-green"
                    href={`/jobs/${job.slug}`}
                    key={job.id}
                  >
                    {job.title}
                    <ArrowRight size={15} />
                  </Link>
                ))
              ) : (
                <p className="text-sm text-brand-muted">
                  Save roles from the marketplace to compare them here.
                </p>
              )}
            </SummaryPanel>
          </div>
        </>
      )}
    </WorkspacePage>
  )
}

export function CandidateApplications() {
  const [applications, setApplications] = useState<Application[] | null>(null)
  useEffect(() => {
    apiRequest<{ applications: Application[] }>('/applications').then((data) =>
      setApplications(data.applications),
    )
  }, [])
  return (
    <WorkspacePage>
      <WorkspaceHeader
        description="Follow each application from submission through the final decision."
        title="Applications"
      />
      {!applications ? (
        <Skeleton className="mt-8 h-64" />
      ) : applications.length ? (
        <div className="mt-8 overflow-hidden rounded-xl border border-brand-line bg-white">
          {applications.map((application) => (
            <article
              className="flex flex-col gap-3 border-b border-brand-line p-5 last:border-0 sm:flex-row sm:items-center"
              key={application.id}
            >
              <div className="flex-1">
                <h2 className="font-bold text-brand-ink">{application.jobTitle}</h2>
                <p className="mt-1 text-sm text-brand-muted">
                  {application.companyName} · Applied{' '}
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>
              <StatusChip>{application.status.replaceAll('_', ' ')}</StatusChip>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            action={
              <Link
                className="inline-flex min-h-11 items-center rounded-lg bg-brand-lime px-4 text-sm font-bold text-brand-ink"
                href="/jobs"
              >
                Explore roles
              </Link>
            }
            description="When you apply to a role, its progress will appear here."
            title="No applications yet"
          />
        </div>
      )}
    </WorkspacePage>
  )
}

export function CandidateSaved() {
  const [jobs, setJobs] = useState<Job[] | null>(null)
  useEffect(() => {
    apiRequest<{ jobs: Job[] }>('/candidate/saved').then((data) => setJobs(data.jobs))
  }, [])
  return (
    <WorkspacePage>
      <WorkspaceHeader
        description="Keep promising roles together while you decide where to apply."
        title="Saved jobs"
      />
      {!jobs ? (
        <Skeleton className="mt-8 h-64" />
      ) : jobs.length ? (
        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {jobs.map((job) => (
            <JobCard
              company={job.companyName}
              href={`/jobs/${job.slug}`}
              jobId={job.id}
              key={job.id}
              language={job.language}
              mode={job.mode}
              process={job.process.replaceAll('_', ' ')}
              salary={job.salary}
              shift={job.shift}
              title={job.title}
              tools={job.tools}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            action={
              <Link
                className="inline-flex min-h-11 items-center rounded-lg bg-brand-lime px-4 text-sm font-bold text-brand-ink"
                href="/jobs"
              >
                Browse jobs
              </Link>
            }
            description="Use the heart button on any role to save it here."
            title="No saved jobs"
          />
        </div>
      )}
    </WorkspacePage>
  )
}

export function CandidateProfile() {
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
          headline: form.get('headline'),
          location: form.get('location'),
          bio: form.get('bio'),
          tools: String(form.get('tools') || '')
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      })
      await refreshProfile()
      setMessage('Profile saved.')
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : 'Could not save profile.')
    }
  }
  return (
    <WorkspacePage>
      <WorkspaceHeader
        description="Give employers a clear picture of your experience and remote-work readiness."
        title="Candidate profile"
      />
      <form
        className="mt-8 grid gap-5 rounded-2xl border border-brand-line bg-white p-6 shadow-card"
        onSubmit={save}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            defaultValue={profile.displayName}
            label="Full name"
            name="displayName"
            required
          />
          <TextInput
            defaultValue={profile.headline}
            label="Professional headline"
            name="headline"
          />
          <TextInput defaultValue={profile.location} label="Location" name="location" />
          <TextInput
            defaultValue={profile.tools?.join(', ')}
            label="Tools, separated by commas"
            name="tools"
          />
        </div>
        <label className="grid gap-2 text-sm font-bold text-brand-ink">
          Professional summary
          <textarea
            className="min-h-36 rounded-lg border border-brand-line bg-brand-soft p-3 font-normal outline-none focus:border-brand-lime"
            defaultValue={profile.bio}
            maxLength={1000}
            name="bio"
          />
        </label>
        <div className="flex items-center gap-4">
          <button className="min-h-11 rounded-lg bg-brand-lime px-5 text-sm font-bold text-brand-ink">
            Save profile
          </button>
          <span aria-live="polite" className="text-sm text-brand-muted">
            {message}
          </span>
        </div>
      </form>
    </WorkspacePage>
  )
}

const typingPrompt =
  'Clear communication helps remote teams solve customer concerns with empathy, accuracy, and confidence.'

export function CandidateAssessment() {
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<{ wpm: number; accuracy: number } | null>(null)
  async function submit() {
    if (!startedAt || !text) return
    const correctCharacters = [...text].filter(
      (character, index) => character === typingPrompt[index],
    ).length
    try {
      const response = await apiRequest<{ result: { wpm: number; accuracy: number } }>(
        '/candidate/typing',
        {
          method: 'POST',
          body: JSON.stringify({
            correctCharacters,
            typedCharacters: text.length,
            elapsedSeconds: Math.max(1, (Date.now() - startedAt) / 1000),
          }),
        },
      )
      setResult(response.result)
      setMessage('Assessment saved to your profile.')
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : 'Could not save assessment.')
    }
  }
  return (
    <WorkspacePage>
      <WorkspaceHeader
        description="Complete the passage once. Your speed and accuracy are calculated on the server."
        title="Typing assessment"
      />
      <div className="mt-8 max-w-3xl rounded-2xl border border-brand-line bg-white p-6 shadow-card">
        <p className="rounded-xl bg-brand-soft p-5 font-medium leading-8 text-brand-ink">
          {typingPrompt}
        </p>
        <label className="mt-5 grid gap-2 text-sm font-bold text-brand-ink">
          Type the passage
          <textarea
            className="min-h-36 rounded-lg border border-brand-line bg-white p-4 font-normal outline-none focus:border-brand-lime"
            disabled={Boolean(result)}
            onChange={(event) => {
              if (!startedAt) setStartedAt(Date.now())
              setText(event.target.value)
            }}
            value={text}
          />
        </label>
        <button
          className="mt-4 min-h-11 rounded-lg bg-brand-lime px-5 text-sm font-bold text-brand-ink disabled:opacity-50"
          disabled={!text || Boolean(result)}
          onClick={submit}
          type="button"
        >
          Finish assessment
        </button>
        {result && (
          <div className="mt-5 grid grid-cols-2 gap-4">
            <MetricCard label="Speed" note="Five characters per word" value={`${result.wpm} WPM`} />
            <MetricCard label="Accuracy" note="Matched characters" value={`${result.accuracy}%`} />
          </div>
        )}
        {message && (
          <p aria-live="polite" className="mt-4 text-sm text-brand-muted">
            {message}
          </p>
        )}
      </div>
    </WorkspacePage>
  )
}

function WorkspacePage({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-7xl p-5 sm:p-8">{children}</main>
}
function SummaryPanel({
  children,
  icon,
  title,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  title: string
}) {
  return (
    <section className="rounded-xl border border-brand-line bg-white p-5 shadow-card">
      <h2 className="flex items-center gap-2 font-bold text-brand-ink">
        {icon}
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
  required = false,
}: {
  defaultValue?: string
  label: string
  name: string
  required?: boolean
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-ink">
      {label}
      <input
        className="min-h-11 rounded-lg border border-brand-line bg-brand-soft px-3 font-normal outline-none focus:border-brand-lime"
        defaultValue={defaultValue}
        name={name}
        required={required}
      />
    </label>
  )
}
