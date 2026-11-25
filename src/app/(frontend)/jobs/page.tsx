import { Footer } from '@/components/layout/footer'
import { PublicHeader } from '@/components/layout/public-header'
import { JobsExplorer } from '@/components/marketplace/jobs-explorer'

export default function JobsPage() {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto min-h-[65vh] max-w-[1200px] px-6 py-14 max-sm:px-4">
        <p className="text-xs font-bold tracking-widest text-brand-green uppercase">
          Verified opportunities
        </p>
        <h1 className="mt-2 text-4xl font-bold">Remote BPO jobs</h1>
        <p className="mt-2 text-brand-muted">Search live roles published by approved employers.</p>
        <JobsExplorer />
      </main>
      <Footer />
    </>
  )
}
