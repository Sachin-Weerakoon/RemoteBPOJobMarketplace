'use client'

import { useEffect, useState } from 'react'
import { Building2, ShieldCheck } from 'lucide-react'
import { WorkspaceHeader } from '@/components/layout/workspace-header'
import { EmptyState, MetricCard, Skeleton } from '@/components/ui/display'
import { StatusChip } from '@/components/ui/core'
import { apiRequest } from '@/lib/api-client'
import type { Profile } from '@/lib/app-types'

export function OperationsDashboard() {
  const [employers, setEmployers] = useState<Profile[] | null>(null)
  useEffect(() => {
    apiRequest<{ employers: Profile[] }>('/operations/employers').then((data) =>
      setEmployers(data.employers),
    )
  }, [])
  return (
    <WorkspacePage>
      <WorkspaceHeader
        description="Protect candidates by reviewing employer identities before publication."
        title="Trust & safety"
      />
      {!employers ? (
        <Skeleton className="mt-8 h-44" />
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Employers"
              note="All registered employer accounts"
              value={String(employers.length)}
            />
            <MetricCard
              label="Pending review"
              note="Require a verification decision"
              value={String(employers.filter((item) => !item.verified).length)}
            />
            <MetricCard
              label="Verified"
              note="Eligible to publish jobs"
              value={String(employers.filter((item) => item.verified).length)}
            />
          </div>
          <div className="mt-8">
            <EmployerVerification employers={employers} onChange={setEmployers} />
          </div>
        </>
      )}
    </WorkspacePage>
  )
}

export function VerificationsPage() {
  const [employers, setEmployers] = useState<Profile[] | null>(null)
  useEffect(() => {
    apiRequest<{ employers: Profile[] }>('/operations/employers').then((data) =>
      setEmployers(data.employers),
    )
  }, [])
  return (
    <WorkspacePage>
      <WorkspaceHeader
        description="Approve only complete, credible employer profiles."
        title="Employer verifications"
      />
      <div className="mt-8">
        {!employers ? (
          <Skeleton className="h-72" />
        ) : (
          <EmployerVerification employers={employers} onChange={setEmployers} />
        )}
      </div>
    </WorkspacePage>
  )
}

function EmployerVerification({
  employers,
  onChange,
}: {
  employers: Profile[]
  onChange: (profiles: Profile[]) => void
}) {
  async function setVerified(profile: Profile, verified: boolean) {
    const { profile: updated } = await apiRequest<{ profile: Profile }>(
      `/operations/employers/${profile.id}`,
      { method: 'PATCH', body: JSON.stringify({ verified }) },
    )
    onChange(employers.map((item) => (item.id === updated.id ? updated : item)))
  }
  if (!employers.length)
    return (
      <EmptyState
        description="Employer registrations will appear here for review."
        title="No employers to review"
      />
    )
  return (
    <div className="grid gap-4">
      {employers.map((profile) => (
        <article
          className="rounded-xl border border-brand-dark bg-brand-action p-5 text-white"
          key={profile.id}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-dark text-brand-lime">
              <Building2 size={20} />
            </span>
            <div className="flex-1">
              <h2 className="font-bold">{profile.companyName || profile.displayName}</h2>
              <p className="mt-1 text-sm text-brand-cool">
                {profile.email} · {profile.location || 'Location not provided'}
              </p>
              {profile.bio && (
                <p className="mt-3 text-sm leading-6 text-brand-cool">{profile.bio}</p>
              )}
            </div>
            <StatusChip icon={<ShieldCheck size={12} />}>
              {profile.verified ? 'Verified' : 'Pending'}
            </StatusChip>
            <button
              className={`min-h-11 rounded-lg px-4 text-sm font-bold ${profile.verified ? 'border border-brand-dark text-brand-cool' : 'bg-brand-lime text-brand-ink'}`}
              onClick={() => setVerified(profile, !profile.verified)}
              type="button"
            >
              {profile.verified ? 'Revoke' : 'Approve'}
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

function WorkspacePage({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-7xl p-5 sm:p-8">{children}</main>
}
