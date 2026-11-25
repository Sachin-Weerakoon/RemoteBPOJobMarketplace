'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { apiRequest } from '@/lib/api-client'
import type { Job } from '@/lib/app-types'
import { JobCard } from '@/components/ui/job-card'
import { EmptyState, Skeleton } from '@/components/ui/display'

export function JobsExplorer() {
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [query, setQuery] = useState('')
  const [process, setProcess] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => {
    apiRequest<{ jobs: Job[] }>('/jobs')
      .then(({ jobs }) => setJobs(jobs))
      .catch((caught) =>
        setError(caught instanceof Error ? caught.message : 'Could not load jobs.'),
      )
  }, [])

  const visible = useMemo(
    () =>
      (jobs ?? []).filter(
        (job) =>
          (process === 'all' || job.process === process) &&
          `${job.title} ${job.companyName} ${job.tools.join(' ')}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [jobs, process, query],
  )

  return (
    <>
      <div className="mt-8 grid gap-3 rounded-xl border border-brand-line bg-white p-4 shadow-card md:grid-cols-[1fr_240px]">
        <label className="relative">
          <span className="sr-only">Search jobs</span>
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-brand-muted" size={18} />
          <input
            className="min-h-12 w-full rounded-lg border border-brand-line bg-brand-soft pr-3 pl-10 outline-none focus:border-brand-lime"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search role, company, or tool"
            value={query}
          />
        </label>
        <label>
          <span className="sr-only">Filter by process</span>
          <select
            className="min-h-12 w-full rounded-lg border border-brand-line bg-brand-soft px-3 outline-none focus:border-brand-lime"
            onChange={(event) => setProcess(event.target.value)}
            value={process}
          >
            <option value="all">All processes</option>
            <option value="customer_service">Customer service</option>
            <option value="tech_support">Technical support</option>
            <option value="data_entry">Data entry</option>
            <option value="content_moderation">Content moderation</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>
      {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-brand-danger">{error}</p>}
      {!jobs && !error && (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      )}
      {jobs && visible.length === 0 && (
        <div className="mt-8">
          <EmptyState
            description={
              jobs.length
                ? 'Try a broader search or a different process.'
                : 'Verified employer roles will appear here as soon as they are published.'
            }
            title={jobs.length ? 'No roles match these filters' : 'No verified roles published'}
          />
        </div>
      )}
      {visible.length > 0 && (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visible.map((job) => (
            <JobCard
              company={job.companyName}
              href={`/jobs/${job.slug}`}
              jobId={job.id}
              key={job.id}
              language={job.language || 'Requirements in job details'}
              mode={job.mode}
              process={job.process.replaceAll('_', ' ')}
              salary={job.salary || 'Compensation in job details'}
              shift={job.shift || 'Schedule in job details'}
              title={job.title}
              tools={job.tools}
            />
          ))}
        </div>
      )}
    </>
  )
}
