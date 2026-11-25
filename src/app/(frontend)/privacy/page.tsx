import { Footer } from '@/components/layout/footer'
import { PublicHeader } from '@/components/layout/public-header'

export default function PrivacyPage() {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto min-h-[65vh] max-w-3xl px-6 py-16">
        <p className="text-xs font-bold tracking-widest text-brand-green uppercase">
          Privacy notice
        </p>
        <h1 className="mt-3 text-4xl font-bold">Your career data stays yours</h1>
        <div className="mt-8 grid gap-5 leading-7 text-brand-muted">
          <p>
            RemoteBPO Hub collects only the information needed to match candidates, support
            applications, and keep the marketplace safe.
          </p>
          <p>
            We do not sell personal data. Candidate information is shared with an employer only
            through an intentional application or conversation.
          </p>
          <p>
            Account data export and deletion controls will be available from account settings before
            public launch.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
