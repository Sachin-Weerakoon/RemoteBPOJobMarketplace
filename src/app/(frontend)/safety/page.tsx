import { Footer } from '@/components/layout/footer'
import { PublicHeader } from '@/components/layout/public-header'

export default function SafetyPage() {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto min-h-[65vh] max-w-3xl px-6 py-16">
        <p className="text-xs font-bold tracking-widest text-brand-green uppercase">
          Trust and safety
        </p>
        <h1 className="mt-3 text-4xl font-bold">A safer way to find remote BPO work</h1>
        <div className="mt-8 grid gap-5 text-brand-muted">
          <p>
            RemoteBPO Hub is designed around verified employers, transparent role requirements,
            visible reporting, and a strict no-fee promise for candidates.
          </p>
          <h2 className="text-xl font-bold text-brand-ink">Never pay to apply</h2>
          <p>
            Legitimate employers do not charge application, placement, interview, or
            equipment-release fees. Report any request for payment immediately.
          </p>
          <h2 className="text-xl font-bold text-brand-ink">Check the details</h2>
          <p>
            Review company verification, compensation, timezone, equipment needs, and communication
            history before sharing additional information.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
