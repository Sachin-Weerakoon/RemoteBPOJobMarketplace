import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react'
import { Check, ChevronDown, Star } from 'lucide-react'

const buttonStyles = {
  primary: 'bg-brand-lime text-brand-ink border-brand-lime hover:bg-brand-lime-hover',
  secondary: 'bg-white text-brand-ink border-brand-line hover:bg-brand-soft',
  ghost: 'bg-transparent text-brand-muted border-transparent hover:bg-brand-soft',
  destructive: 'bg-white text-brand-danger border-red-200 hover:bg-red-50',
} as const

export function Button({
  className = '',
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonStyles
}) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-bold transition focus-visible:outline-3 focus-visible:outline-brand-focus disabled:cursor-not-allowed disabled:opacity-45 ${buttonStyles[variant]} ${className}`}
      {...props}
    />
  )
}

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex min-h-7 items-center gap-1.5 rounded-full bg-brand-sage px-2.5 text-xs font-bold text-brand-action shadow-[inset_0_1px_0_rgba(255,255,255,.65)] ${className}`}
    >
      {children}
    </span>
  )
}

export function Field({
  error,
  hint,
  id,
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  hint?: string
  label: string
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-ink" htmlFor={id}>
      {label}
      <input
        aria-describedby={error || hint ? `${id}-message` : undefined}
        aria-invalid={Boolean(error)}
        className="min-h-11 rounded-lg border border-brand-line bg-brand-soft px-3 font-normal text-brand-ink shadow-[inset_0_1px_2px_rgba(18,35,39,.04)] outline-none transition placeholder:text-brand-cool focus:border-brand-lime"
        id={id}
        {...props}
      />
      {(error || hint) && (
        <span
          className={`text-xs font-normal ${error ? 'text-brand-danger' : 'text-brand-muted'}`}
          id={`${id}-message`}
        >
          {error || hint}
        </span>
      )}
    </label>
  )
}

export function SelectField({
  children,
  id,
  label,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode
  label: string
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-ink" htmlFor={id}>
      {label}
      <span className="relative">
        <select
          className="min-h-11 w-full appearance-none rounded-lg border border-brand-line bg-brand-soft px-3 pr-10 font-normal text-brand-ink outline-none focus:border-brand-lime"
          id={id}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-brand-muted"
          size={16}
        />
      </span>
    </label>
  )
}

export function Checkbox({
  description,
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  description?: string
  label: string
}) {
  return (
    <label className="flex min-h-11 items-start gap-3 text-sm text-brand-ink">
      <input className="mt-1 size-4 accent-brand-lime" type="checkbox" {...props} />
      <span className="grid gap-0.5">
        <b>{label}</b>
        {description && <small className="text-brand-muted">{description}</small>}
      </span>
    </label>
  )
}

export function RatingStars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          aria-hidden
          className={star <= Math.round(rating) ? 'text-amber-500' : 'text-brand-line'}
          fill="currentColor"
          key={star}
          size={15}
        />
      ))}
    </span>
  )
}

export function StatusChip({
  children,
  icon = <Check size={12} />,
}: {
  children: ReactNode
  icon?: ReactNode
}) {
  return (
    <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-brand-line bg-white px-2.5 text-xs font-bold text-brand-action">
      {icon}
      {children}
    </span>
  )
}
