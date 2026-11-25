'use client'

import { useEffect, useState } from 'react'
import { Building2, MapPin, ShieldCheck } from 'lucide-react'
import { apiRequest } from '@/lib/api-client'
import { EmptyState, Skeleton } from '@/components/ui/display'

type Company = { id: string; name: string; location: string; bio: string; verified: boolean }

export function CompaniesExplorer() {
  const [companies, setCompanies] = useState<Company[] | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    apiRequest<{ companies: Company[] }>('/companies')
      .then(({ companies }) => setCompanies(companies))
      .catch((caught) =>
        setError(caught instanceof Error ? caught.message : 'Could not load companies.'),
      )
  }, [])
  if (error) return <p className="mt-8 rounded-xl bg-red-50 p-4 text-brand-danger">{error}</p>
  if (!companies)
    return (
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
      </div>
    )
  if (!companies.length)
    return (
      <div className="mt-8">
        <EmptyState
          description="Approved employers will appear here after the trust team completes verification."
          title="No verified companies yet"
        />
      </div>
    )
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <article
          className="rounded-xl border border-brand-line bg-white p-6 shadow-card"
          key={company.id}
        >
          <span className="grid size-12 place-items-center rounded-xl bg-brand-sage text-brand-ink">
            <Building2 size={22} />
          </span>
          <h2 className="mt-4 text-xl font-bold text-brand-ink">{company.name}</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-brand-muted">
            <MapPin size={15} />
            {company.location}
          </p>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-brand-muted">
            {company.bio || 'Verified remote BPO employer.'}
          </p>
          <p className="mt-5 flex items-center gap-2 text-xs font-bold text-brand-green">
            <ShieldCheck size={15} />
            Identity verified
          </p>
        </article>
      ))}
    </div>
  )
}
