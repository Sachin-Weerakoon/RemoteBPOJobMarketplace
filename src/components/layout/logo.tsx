import Link from 'next/link'

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      aria-label="RemoteBPO Hub home"
      className={`inline-flex min-h-11 items-center gap-2.5 font-bold ${inverse ? 'text-white' : 'text-brand-ink'}`}
      href="/"
    >
      <span
        className={`grid size-9 place-items-center rounded-[10px] text-sm font-bold ${inverse ? 'bg-brand-lime text-brand-ink' : 'bg-brand-ink text-brand-lime'}`}
      >
        R
      </span>
      <span>
        RemoteBPO{' '}
        <span className={inverse ? 'font-normal text-brand-cool' : 'font-normal text-brand-muted'}>
          Hub
        </span>
      </span>
    </Link>
  )
}
