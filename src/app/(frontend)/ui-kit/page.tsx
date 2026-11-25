import { ArrowRight, Check, Clock3, ShieldCheck, Sparkles } from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import { MobileTabs } from '@/components/layout/mobile-tabs'
import { PublicHeader } from '@/components/layout/public-header'
import { SideNav } from '@/components/layout/side-nav'
import { WorkspaceHeader } from '@/components/layout/workspace-header'
import { Badge, Checkbox, Field, RatingStars, SelectField, StatusChip } from '@/components/ui/core'
import {
  Alert,
  CompanyCard,
  EmptyState,
  MetricCard,
  ProgressRing,
  Skeleton,
} from '@/components/ui/display'
import { JobCard } from '@/components/ui/job-card'
import { ButtonDemo, InteractiveDemo } from '@/components/ui/modal-demo'
import { Tabs } from '@/components/ui/tabs'
import { Toggle } from '@/components/ui/toggle'
import {
  AvailabilityGrid,
  DataTable,
  FileUpload,
  FilterPanel,
  KanbanBoard,
} from '@/components/ui/work-patterns'

const palette = [
  ['Lime', '#A3E635', 'bg-brand-lime'],
  ['Ink', '#122327', 'bg-brand-ink'],
  ['Action', '#152925', 'bg-brand-action'],
  ['Sage', '#E4EEE3', 'bg-brand-sage'],
  ['Canvas', '#F3F7F4', 'bg-brand-canvas'],
  ['Cool sage', '#9BB0B5', 'bg-brand-cool'],
]

function Section({
  children,
  eyebrow,
  title,
}: {
  children: React.ReactNode
  eyebrow: string
  title: string
}) {
  return (
    <section className="border-t border-brand-line py-14 first:border-0">
      <p className="text-xs font-bold tracking-[0.16em] text-brand-green uppercase">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">{title}</h2>
      <div className="mt-7">{children}</div>
    </section>
  )
}

export default function UIKitPage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="arowana-texture border-b border-brand-line">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <Badge>
              <Sparkles size={13} /> Phase one foundation
            </Badge>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-brand-ink sm:text-6xl">
              A clear, trustworthy system for remote work.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-brand-muted sm:text-lg">
              The RemoteBPO Hub interface library pairs focused interaction patterns with an
              accessible lime, sage, and deep-ink visual language.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Section eyebrow="Foundations" title="Color and typography">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {palette.map(([name, value, color]) => (
                <div
                  className="overflow-hidden rounded-xl border border-brand-line bg-white"
                  key={name}
                >
                  <div className={`h-24 ${color}`} />
                  <div className="p-3">
                    <b className="text-sm text-brand-ink">{name}</b>
                    <code className="mt-1 block text-xs text-brand-muted">{value}</code>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-5 rounded-2xl border border-brand-line bg-white p-6 shadow-card lg:grid-cols-[1.3fr_1fr] lg:p-8">
              <div>
                <p className="text-5xl font-bold tracking-tight text-brand-ink">
                  Inter, with intent.
                </p>
                <p className="mt-4 max-w-xl leading-7 text-brand-muted">
                  Compact headings establish confidence while comfortable body copy keeps complex
                  hiring workflows easy to scan.
                </p>
              </div>
              <div className="grid content-center gap-2 border-l-0 border-brand-line lg:border-l lg:pl-8">
                <span className="text-xs font-bold tracking-widest text-brand-green uppercase">
                  Display / 48
                </span>
                <span className="text-xl font-bold text-brand-ink">Heading / 20 bold</span>
                <span className="text-base text-brand-muted">Body / 16 regular</span>
                <span className="text-xs text-brand-muted">Caption / 12 regular</span>
              </div>
            </div>
          </Section>

          <Section eyebrow="Actions" title="Buttons, tabs, and feedback">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-brand-line bg-white p-6 shadow-card">
                <ButtonDemo />
              </div>
              <div className="rounded-xl border border-brand-line bg-white p-6 shadow-card">
                <Tabs active="Overview" items={['Overview', 'Applications', 'Messages']} />
              </div>
              <div className="rounded-xl border border-brand-line bg-white p-6 shadow-card lg:col-span-2">
                <InteractiveDemo />
              </div>
            </div>
          </Section>

          <Section eyebrow="Inputs" title="Forms and selection controls">
            <div className="grid gap-7 rounded-2xl border border-brand-line bg-white p-6 shadow-card lg:grid-cols-3 lg:p-8">
              <Field
                hint="Use the email attached to your profile."
                id="kit-email"
                label="Email address"
                placeholder="name@example.com"
                type="email"
              />
              <Field
                error="Enter at least 8 characters."
                id="kit-password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <SelectField defaultValue="professional" id="kit-english" label="English level">
                <option value="professional">Professional working</option>
                <option value="fluent">Fluent</option>
              </SelectField>
              <Checkbox
                defaultChecked
                description="Receive relevant role alerts."
                label="Job recommendations"
              />
              <Toggle checked label="Profile visible to employers" />
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Customer support</Badge>
                <StatusChip icon={<ShieldCheck size={12} />}>Verified</StatusChip>
                <StatusChip icon={<Clock3 size={12} />}>In review</StatusChip>
              </div>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <FileUpload />
              <AvailabilityGrid />
            </div>
          </Section>

          <Section eyebrow="Marketplace" title="Cards and matching patterns">
            <div className="grid gap-6 lg:grid-cols-2">
              <JobCard
                company="Example Operations"
                href="/jobs"
                language="English · Professional"
                match={88}
                mode="Full time"
                process="Customer support"
                salary="Compensation shown on published roles"
                shift="Evening shift"
                title="Customer support specialist"
                tools={['Zendesk', 'Google Workspace']}
              />
              <div className="grid content-start gap-5">
                <CompanyCard />
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    label="Profile strength"
                    note="Complete key profile sections"
                    value="82%"
                  />
                  <div className="flex items-center gap-4 rounded-xl border border-brand-line bg-white p-5 shadow-card">
                    <ProgressRing label="Role match" value={88} />
                    <div>
                      <b className="text-brand-ink">Strong match</b>
                      <div className="mt-2">
                        <RatingStars rating={4.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section eyebrow="Workspaces" title="Navigation and operational views">
            <div className="overflow-hidden rounded-2xl border border-brand-line bg-brand-canvas shadow-card">
              <div className="grid min-h-[480px] lg:grid-cols-[240px_1fr]">
                <SideNav active="Overview" preview role="employer" />
                <div className="min-w-0 p-5 sm:p-8">
                  <WorkspaceHeader
                    action={<StatusChip icon={<Check size={12} />}>Preview</StatusChip>}
                    description="A focused overview for daily hiring work."
                    headingLevel="h3"
                    title="Employer workspace"
                  />
                  <div className="mt-8">
                    <KanbanBoard />
                  </div>
                </div>
              </div>
              <MobileTabs employer preview />
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
              <FilterPanel />
              <DataTable />
            </div>
          </Section>

          <Section eyebrow="System states" title="Alerts, empty states, and loading">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="grid gap-3">
                <Alert>Keep your profile current to improve role recommendations.</Alert>
                <Alert tone="success">Your information was saved successfully.</Alert>
                <Alert tone="warning">Two profile fields still need attention.</Alert>
                <Alert tone="error">
                  We could not save that change. Review the form and try again.
                </Alert>
              </div>
              <EmptyState
                action={
                  <a
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-lime px-4 text-sm font-bold text-brand-ink hover:bg-brand-lime-hover"
                    href="/jobs"
                  >
                    Explore roles <ArrowRight size={16} />
                  </a>
                }
                description="Saved roles will appear here when you choose them from the marketplace."
                title="No saved roles yet"
              />
            </div>
            <div className="mt-5 rounded-xl border border-brand-line bg-white p-5">
              <span className="sr-only">Loading content</span>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-4 h-8 w-2/3" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  )
}
