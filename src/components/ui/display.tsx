import type { ReactNode } from 'react'
import { AlertTriangle, CheckCircle2, Inbox, Star } from 'lucide-react'

export function Avatar({ label, size = 'md' }: { label: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'size-9 text-xs', md: 'size-11 text-sm', lg: 'size-16 text-lg' }
  return (
    <span
      aria-label={label}
      className={`grid shrink-0 place-items-center rounded-full bg-brand-ink font-bold text-brand-lime ${sizes[size]}`}
      role="img"
    >
      {label
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)}
    </span>
  )
}

export function MetricCard({ label, note, value }: { label: string; note: string; value: string }) {
  return (
    <article className="rounded-xl border border-brand-line bg-white p-5 shadow-card">
      <p className="text-xs font-bold tracking-wide text-brand-muted uppercase">{label}</p>
      <strong className="mt-3 block text-3xl tracking-tight text-brand-ink">{value}</strong>
      <p className="mt-1 text-xs text-brand-muted">{note}</p>
    </article>
  )
}

export function ProgressRing({ label, value }: { label: string; value: number }) {
  return (
    <div
      aria-label={`${label}: ${value}%`}
      className="grid size-20 place-items-center rounded-full bg-[conic-gradient(var(--color-brand-lime)_var(--progress),var(--color-brand-sage)_0)] p-2"
      style={{ '--progress': `${value}%` } as React.CSSProperties}
    >
      <span className="grid size-full place-items-center rounded-full bg-white text-sm font-bold text-brand-ink">
        {value}%
      </span>
    </div>
  )
}

export function Alert({
  children,
  tone = 'info',
}: {
  children: ReactNode
  tone?: 'info' | 'success' | 'warning' | 'error'
}) {
  const tones = {
    info: 'border-brand-line bg-brand-soft text-brand-action',
    success: 'border-green-200 bg-green-50 text-green-800',
    warning: 'border-amber-200 bg-amber-50 text-amber-900',
    error: 'border-red-200 bg-red-50 text-brand-danger',
  }
  const Icon = tone === 'success' ? CheckCircle2 : AlertTriangle
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${tones[tone]}`}
      role="status"
    >
      <Icon aria-hidden className="mt-0.5 shrink-0" size={18} />
      <div>{children}</div>
    </div>
  )
}

export function EmptyState({
  action,
  description,
  title,
}: {
  action?: ReactNode
  description: string
  title: string
}) {
  return (
    <div className="grid min-h-56 place-items-center rounded-xl border border-dashed border-brand-line bg-white p-8 text-center">
      <div className="max-w-sm">
        <Inbox className="mx-auto text-brand-cool" size={32} />
        <h3 className="mt-3 text-lg font-bold text-brand-ink">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-brand-muted">{description}</p>
        {action && <div className="mt-5">{action}</div>}
      </div>
    </div>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden className={`block animate-pulse rounded-lg bg-brand-sage ${className}`} />
  )
}

export function CompanyCard() {
  return (
    <article className="flex items-center gap-4 rounded-xl border border-brand-line bg-white p-5 shadow-card">
      <Avatar label="Cloudstaff Pro" size="lg" />
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-brand-ink">Cloudstaff Pro</h3>
        <p className="mt-1 text-sm text-brand-muted">Customer experience operations</p>
        <span className="mt-2 flex items-center gap-1 text-xs text-brand-muted">
          <Star className="text-amber-500" fill="currentColor" size={14} /> 4.9 · Component example
        </span>
      </div>
    </article>
  )
}
