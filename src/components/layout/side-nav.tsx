import Link from 'next/link'
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  FileCheck2,
  Home,
  ClipboardCheck,
  Heart,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Logo } from './logo'
import { Avatar } from '../ui/display'

const roleItems = {
  candidate: [
    [Home, 'Dashboard', '/candidate'],
    [Search, 'Find jobs', '/jobs'],
    [FileCheck2, 'Applications', '/candidate/applications'],
    [Heart, 'Saved jobs', '/candidate/saved'],
    [ClipboardCheck, 'Assessment', '/candidate/assessment'],
    [Users, 'Profile', '/candidate/profile'],
  ],
  employer: [
    [Home, 'Dashboard', '/employer'],
    [BriefcaseBusiness, 'My jobs', '/employer/jobs'],
    [Users, 'Applicants', '/employer/applicants'],
    [Building2, 'Company', '/employer/company'],
  ],
  admin: [
    [Home, 'Overview', '/operations'],
    [ShieldCheck, 'Verifications', '/operations/verifications'],
  ],
} as const

export function SideNav({
  active,
  displayName,
  preview = false,
  role,
}: {
  active: string
  displayName?: string
  preview?: boolean
  role: keyof typeof roleItems
}) {
  const dark = role === 'admin'
  return (
    <aside
      className={`flex min-h-[680px] w-60 shrink-0 flex-col border-r p-4 ${dark ? 'border-brand-dark bg-brand-ink' : 'border-brand-line bg-white'}`}
    >
      <div className="px-2 py-1">
        <Logo inverse={dark} />
      </div>
      <p
        className={`mt-8 px-3 text-[10px] font-bold tracking-widest ${dark ? 'text-brand-cool' : 'text-brand-muted'}`}
      >
        {role.toUpperCase()} WORKSPACE
      </p>
      <nav className="mt-2 grid gap-1">
        {roleItems[role].map(([Icon, label, href]) => {
          const className = `flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-bold ${label === active ? (dark ? 'bg-brand-dark text-brand-lime' : 'bg-brand-sage text-brand-ink') : dark ? 'text-brand-cool hover:bg-brand-dark' : 'text-brand-muted hover:bg-brand-soft'}`
          return preview ? (
            <span
              aria-current={label === active ? 'page' : undefined}
              className={className}
              key={href}
            >
              <Icon size={18} />
              {label}
            </span>
          ) : (
            <Link
              aria-current={label === active ? 'page' : undefined}
              className={className}
              href={href}
              key={href}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className={`mt-auto border-t pt-4 ${dark ? 'border-brand-dark' : 'border-brand-line'}`}>
        {preview ? (
          <span
            className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-bold ${dark ? 'text-brand-cool' : 'text-brand-muted'}`}
          >
            <Settings size={18} />
            Settings
          </span>
        ) : (
          <Link
            className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-bold ${dark ? 'text-brand-cool' : 'text-brand-muted'}`}
            href={role === 'admin' ? '/operations/settings' : `/${role}/settings`}
          >
            <Settings size={18} />
            Settings
          </Link>
        )}
        <div className="mt-2 flex items-center gap-3 rounded-lg p-2">
          <Avatar label={displayName || (role === 'admin' ? 'Trust Admin' : 'Account')} />
          <span className="grid text-xs">
            <b className={dark ? 'text-white' : 'text-brand-ink'}>
              {displayName || (role === 'admin' ? 'Trust Admin' : 'Account')}
            </b>
            <span className="capitalize text-brand-cool">{role}</span>
          </span>
          <Bell className="ml-auto text-brand-cool" size={17} />
        </div>
      </div>
    </aside>
  )
}
