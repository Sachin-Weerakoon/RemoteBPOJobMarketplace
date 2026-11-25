import { CheckCircle2, Clock3, ShieldCheck } from 'lucide-react'

export function TrustStrip() {
  return (
    <section aria-label="Marketplace safety commitments" className="bg-brand-ink text-white">
      <div className="mx-auto flex min-h-[68px] max-w-[1200px] items-center gap-7 px-6 py-3 max-md:flex-wrap max-md:gap-3 max-sm:px-4">
        <strong className="flex items-center gap-2">
          <ShieldCheck className="text-brand-lime" size={20} /> Verified employers only
        </strong>
        <span className="flex-1 text-sm text-brand-cool">
          Identity and business evidence are reviewed before publishing.
        </span>
        <span className="flex items-center gap-1.5 text-xs text-brand-cool">
          <CheckCircle2 className="text-brand-lime" size={15} /> No candidate fees
        </span>
        <span className="flex items-center gap-1.5 text-xs text-brand-cool">
          <Clock3 className="text-brand-lime" size={15} /> Safety-first moderation
        </span>
      </div>
    </section>
  )
}
