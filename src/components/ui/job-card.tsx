import Link from 'next/link'
import { BriefcaseBusiness, Clock3, Languages, ShieldCheck, Wifi, Zap } from 'lucide-react'
import { Badge } from './core'
import { SaveButton } from './save-button'

export type JobCardProps = {
  company: string
  href: string
  jobId?: string
  language: string
  match?: number
  mode: string
  process: string
  responseHint?: string
  salary: string
  shift: string
  title: string
  tools: string[]
}

export function JobCard({
  company,
  href,
  jobId,
  language,
  match,
  mode,
  process,
  responseHint,
  salary,
  shift,
  title,
  tools,
}: JobCardProps) {
  return (
    <article className="rounded-xl border border-brand-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-lime">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-brand-sage text-xs font-bold text-brand-ink">
          {company
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 text-xs font-bold text-brand-muted">
            {company}
            <Badge>
              <ShieldCheck size={12} /> Verified
            </Badge>
          </p>
          <Link className="mt-1 block text-lg font-bold text-brand-ink hover:underline" href={href}>
            {title}
          </Link>
        </div>
        <SaveButton jobId={jobId} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>{process}</Badge>
        <Badge>{mode}</Badge>
        <Badge>
          <Wifi size={12} /> Remote
        </Badge>
      </div>
      <dl className="mt-5 grid gap-2.5 text-sm text-brand-muted">
        <div className="flex items-center gap-2">
          <Languages size={16} />
          <dd>{language}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 size={16} />
          <dd>{shift}</dd>
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseBusiness size={16} />
          <dd>{salary}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tools.map((tool) => (
          <span
            className="rounded-md border border-brand-line bg-brand-canvas px-2 py-1 text-xs text-brand-muted"
            key={tool}
          >
            {tool}
          </span>
        ))}
      </div>
      {match !== undefined && (
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-xs text-brand-muted">
            <span>Profile match</span>
            <b className="text-brand-green">{match}%</b>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-brand-sage">
            <div className="h-full rounded-full bg-brand-lime" style={{ width: `${match}%` }} />
          </div>
        </div>
      )}
      <footer className="mt-5 flex items-center justify-between gap-3 border-t border-brand-soft pt-4">
        <span className="flex items-center gap-1 text-xs text-brand-muted">
          <Zap className="text-brand-green" size={13} />
          {responseHint ?? 'Response time appears after enough activity'}
        </span>
        <Link
          className="inline-flex min-h-11 items-center rounded-lg border border-brand-line bg-white px-4 text-sm font-bold text-brand-ink hover:bg-brand-soft"
          href={href}
        >
          View job
        </Link>
      </footer>
    </article>
  )
}
