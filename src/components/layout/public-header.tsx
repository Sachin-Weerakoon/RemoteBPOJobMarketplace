import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Logo } from './logo'

const links = [
  ['Find jobs', '/jobs'],
  ['Companies', '/companies'],
  ['For employers', '/for-employers'],
] as const

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-brand-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-6 px-6 max-sm:px-4">
        <Logo />
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <Link
              className="inline-flex min-h-11 items-center rounded-lg px-3.5 text-sm font-bold text-brand-muted hover:bg-brand-soft hover:text-brand-ink"
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            className="inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-bold text-brand-muted hover:bg-brand-soft"
            href="/login"
          >
            Sign in
          </Link>
          <Link
            className="inline-flex min-h-11 items-center rounded-lg bg-brand-lime px-4 text-sm font-bold text-brand-ink hover:bg-brand-lime-hover"
            href="/register"
          >
            Join free
          </Link>
        </div>
        <details className="relative md:hidden">
          <summary
            aria-label="Open navigation"
            className="grid size-11 cursor-pointer list-none place-items-center rounded-lg text-brand-ink hover:bg-brand-soft"
          >
            <Menu size={20} />
          </summary>
          <nav className="absolute top-12 right-0 grid w-60 gap-1 rounded-xl border border-brand-line bg-white p-2 shadow-xl">
            {links.map(([label, href]) => (
              <Link
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-bold text-brand-ink hover:bg-brand-soft"
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
            <Link
              className="flex min-h-11 items-center rounded-lg px-3 text-sm font-bold text-brand-ink hover:bg-brand-soft"
              href="/login"
            >
              Sign in
            </Link>
            <Link
              className="flex min-h-11 items-center rounded-lg bg-brand-lime px-3 text-sm font-bold text-brand-ink"
              href="/register"
            >
              Join free
            </Link>
          </nav>
        </details>
      </div>
    </header>
  )
}
