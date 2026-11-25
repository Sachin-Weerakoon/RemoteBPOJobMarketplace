import type { ReactNode } from 'react'
import { Bell } from 'lucide-react'

export function WorkspaceHeader({
  action,
  description,
  headingLevel = 'h1',
  title,
}: {
  action?: ReactNode
  description: string
  headingLevel?: 'h1' | 'h2' | 'h3'
  title: string
}) {
  const Heading = headingLevel
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <Heading className="text-3xl font-bold tracking-tight text-brand-ink">{title}</Heading>
        <p className="mt-1 text-sm text-brand-muted">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <span
          aria-label="Notifications"
          className="grid size-11 place-items-center rounded-lg border border-brand-line bg-white text-brand-muted"
          role="img"
        >
          <Bell size={19} />
        </span>
        {action}
      </div>
    </header>
  )
}
