import { Footer } from '@/components/layout/footer'
import { PublicHeader } from '@/components/layout/public-header'
import { CompaniesExplorer } from '@/components/marketplace/companies-explorer'

export default function CompaniesPage() {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto min-h-[65vh] max-w-[1200px] px-6 py-14 max-sm:px-4">
        <p className="text-xs font-bold tracking-widest text-brand-green uppercase">
          Employer directory
        </p>
        <h1 className="mt-2 text-4xl font-bold">Verified BPO companies</h1>
        <p className="mt-2 text-brand-muted">Only approved employer profiles are shown publicly.</p>
        <CompaniesExplorer />
      </main>
      <Footer />
    </>
  )
}
