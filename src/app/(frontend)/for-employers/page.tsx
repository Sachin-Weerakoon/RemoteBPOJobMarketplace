import Link from 'next/link'
import { CheckCircle2, ShieldCheck, Users, Zap } from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import { PublicHeader } from '@/components/layout/public-header'

export default function ForEmployersPage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="mx-auto max-w-[1200px] px-6 py-20 max-sm:px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-widest text-brand-green uppercase">
              Hire with evidence
            </p>
            <h1 className="mt-3 text-5xl font-bold leading-tight max-sm:text-4xl">
              Build a remote BPO team around verified fit.
            </h1>
            <p className="mt-5 text-lg leading-8 text-brand-muted">
              Review language proficiency, shift overlap, tools, typing benchmarks, and workspace
              readiness in one structured hiring flow.
            </p>
            <Link
              className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-brand-lime px-5 text-sm font-bold text-brand-ink"
              href="/register"
            >
              Create an employer account
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {[
              [
                ShieldCheck,
                'Trust before reach',
                'Company verification protects candidates and strengthens employer credibility.',
              ],
              [
                Users,
                'Structured applicant review',
                'Comparable fit and typing signals reduce screening noise.',
              ],
              [
                Zap,
                'Faster next actions',
                'Hiring funnels surface candidates and conversations that need attention.',
              ],
            ].map(([Icon, title, copy]) => (
              <article
                className="rounded-xl border border-brand-line bg-white p-7 shadow-card"
                key={title as string}
              >
                <Icon className="text-brand-green" />
                <h2 className="mt-5 text-lg font-bold">{title as string}</h2>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{copy as string}</p>
                <span className="mt-5 flex items-center gap-2 text-xs font-bold text-brand-action">
                  <CheckCircle2 className="text-brand-green" size={15} /> Included in the hiring
                  workspace
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
