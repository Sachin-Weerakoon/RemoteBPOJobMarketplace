'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, BriefcaseBusiness, Clock3, Languages, MapPin, ShieldCheck } from 'lucide-react'
import { apiRequest } from '@/lib/api-client'
import type { Job } from '@/lib/app-types'
import { Alert, Skeleton } from '@/components/ui/display'

export function JobDetail({ slug }: { slug: string }) {
  const [job, setJob] = useState<Job | null>(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [coverNote, setCoverNote] = useState('')
  useEffect(() => {
    apiRequest<{ job: Job }>(`/jobs/${slug}`)
      .then(({ job }) => setJob(job))
      .catch((caught) =>
        setError(caught instanceof Error ? caught.message : 'Could not load this job.'),
      )
  }, [slug])

  async function apply() {
    try {
      await apiRequest('/applications', {
        method: 'POST',
        body: JSON.stringify({ jobId: job?.id, coverNote }),
      })
      setMessage('Application submitted. Track it from your candidate workspace.')
    } catch (caught) {
      if (caught instanceof Error && caught.message === 'Authentication required.') {
        window.location.href = `/login?next=/jobs/${slug}`
      } else {
        setMessage(caught instanceof Error ? caught.message : 'Application failed.')
      }
    }
  }

  if (error)
    return (
      <main className="mx-auto max-w-3xl px-5 py-20">
        <Alert tone="error">{error}</Alert>
      </main>
    )
  if (!job)
    return (
      <main className="mx-auto max-w-5xl px-5 py-16">
        <Skeleton className="h-96" />
      </main>
    )
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <Link
        className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-muted hover:text-brand-ink"
        href="/jobs"
      >
        <ArrowLeft size={17} />
        Back to jobs
      </Link>
      <div className="mt-5 grid gap-7 lg:grid-cols-[1fr_320px]">
        <article className="rounded-2xl border border-brand-line bg-white p-7 shadow-card">
          <p className="flex items-center gap-2 text-sm font-bold text-brand-green">
            <ShieldCheck size={16} />
            Verified employer · {job.companyName}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-ink">{job.title}</h1>
          <div className="mt-6 grid gap-3 text-sm text-brand-muted sm:grid-cols-2">
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {job.location}
            </span>
            <span className="flex items-center gap-2">
              <Clock3 size={16} />
              {job.shift || 'Flexible schedule'}
            </span>
            <span className="flex items-center gap-2">
              <Languages size={16} />
              {job.language || 'See role requirements'}
            </span>
            <span className="flex items-center gap-2">
              <BriefcaseBusiness size={16} />
              {job.salary || 'Discussed during screening'}
            </span>
          </div>
          <div className="mt-7 border-t border-brand-line pt-7">
            <h2 className="text-xl font-bold text-brand-ink">About this role</h2>
            <p className="mt-3 whitespace-pre-wrap leading-7 text-brand-muted">{job.description}</p>
          </div>
          {job.tools.length > 0 && (
            <div className="mt-7">
              <h2 className="text-xl font-bold text-brand-ink">Tools</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.tools.map((tool) => (
                  <span
                    className="rounded-full bg-brand-sage px-3 py-1.5 text-xs font-bold text-brand-action"
                    key={tool}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
        <aside className="h-fit rounded-2xl border border-brand-line bg-brand-soft p-6">
          <h2 className="text-xl font-bold text-brand-ink">Apply with confidence</h2>
          <p className="mt-2 text-sm leading-6 text-brand-muted">
            Your profile and assessment results are shared only when you apply.
          </p>
          <label className="mt-5 grid gap-2 text-sm font-bold text-brand-ink">
            Short note{' '}
            <textarea
              className="min-h-32 rounded-lg border border-brand-line bg-white p-3 font-normal outline-none focus:border-brand-lime"
              maxLength={1500}
              onChange={(event) => setCoverNote(event.target.value)}
              placeholder="Why are you a strong fit?"
              value={coverNote}
            />
          </label>
          <button
            className="mt-4 min-h-12 w-full rounded-lg bg-brand-lime px-4 text-sm font-bold text-brand-ink hover:bg-brand-lime-hover"
            onClick={apply}
            type="button"
          >
            Submit application
          </button>
          {message && (
            <p aria-live="polite" className="mt-4 text-sm text-brand-muted">
              {message}
            </p>
          )}
        </aside>
      </div>
    </main>
  )
}
