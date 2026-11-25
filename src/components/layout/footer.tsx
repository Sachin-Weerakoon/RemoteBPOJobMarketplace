import Link from 'next/link'
import { Logo } from './logo'

const groups = [
  [
    'Candidates',
    [
      ['Find jobs', '/jobs'],
      ['Companies', '/companies'],
    ],
  ],
  [
    'Employers',
    [
      ['For employers', '/for-employers'],
      ['Create account', '/register'],
    ],
  ],
  [
    'Trust',
    [
      ['Safety', '/safety'],
      ['Privacy', '/privacy'],
    ],
  ],
] as const

export function Footer() {
  return (
    <footer className="bg-brand-ink px-6 pt-16 pb-10 text-brand-cool max-sm:px-4">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[2fr_1fr_1fr_1fr] gap-10 max-md:grid-cols-2 max-sm:grid-cols-1">
        <div>
          <Logo inverse />
          <p className="mt-4 max-w-xs text-sm leading-6">
            Verified remote BPO opportunities for a global workforce.
          </p>
        </div>
        {groups.map(([heading, items]) => (
          <div className="grid content-start gap-3" key={heading}>
            <b className="text-white">{heading}</b>
            {items.map(([label, href]) => (
              <Link className="text-sm hover:text-white" href={href} key={href}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-[1200px] justify-between gap-4 border-t border-brand-dark pt-5 text-xs max-sm:flex-col">
        <span>© 2026 RemoteBPO Hub</span>
        <span>Trust-first remote hiring</span>
      </div>
    </footer>
  )
}
