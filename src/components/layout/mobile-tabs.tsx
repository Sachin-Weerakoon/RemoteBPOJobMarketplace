import Link from 'next/link'
import { BriefcaseBusiness, Building2, FileCheck2, Home, Heart, Search, Users } from 'lucide-react'

export function MobileTabs({
  employer = false,
  preview = false,
}: {
  employer?: boolean
  preview?: boolean
}) {
  const items = employer
    ? [
        [Home, 'Home', '/employer'],
        [BriefcaseBusiness, 'Jobs', '/employer/jobs'],
        [Users, 'Applicants', '/employer/applicants'],
        [Building2, 'Company', '/employer/company'],
      ]
    : [
        [Home, 'Home', '/candidate'],
        [Search, 'Jobs', '/jobs'],
        [FileCheck2, 'Applications', '/candidate/applications'],
        [Heart, 'Saved', '/candidate/saved'],
        [Users, 'Profile', '/candidate/profile'],
      ]

  return (
    <nav
      aria-label="Mobile workspace navigation"
      className="flex min-h-16 items-center justify-around border-t border-brand-line bg-white"
    >
      {items.map(([Icon, label, href], index) => {
        const className = `flex min-h-11 min-w-14 flex-col items-center justify-center gap-1 text-[10px] font-bold ${index === 0 ? 'text-brand-green' : 'text-brand-cool'}`
        return preview ? (
          <span className={className} key={href as string}>
            <Icon size={19} />
            {label as string}
          </span>
        ) : (
          <Link className={className} href={href as string} key={href as string}>
            <Icon size={19} />
            {label as string}
          </Link>
        )
      })}
    </nav>
  )
}
