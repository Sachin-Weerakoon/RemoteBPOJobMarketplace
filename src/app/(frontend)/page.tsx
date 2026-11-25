import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Languages,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Wifi,
  Zap,
} from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import { PublicHeader } from '@/components/layout/public-header'
import { TrustStrip } from '@/components/layout/trust-strip'
import { Badge } from '@/components/ui/core'

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="mx-auto grid min-h-[560px] max-w-[1200px] grid-cols-[1.12fr_.88fr] items-center gap-16 px-6 py-16 max-lg:grid-cols-1 max-sm:px-4 max-sm:py-10">
          <div>
            <Badge>
              <ShieldCheck size={13} /> Trusted remote BPO jobs
            </Badge>
            <h1 className="mt-5 text-[50px] leading-[1.12] font-bold text-brand-ink max-sm:text-[34px]">
              Remote BPO work.
              <br />
              <span className="text-brand-green">Real companies.</span> Better fit.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-muted max-sm:text-base">
              Find verified opportunities matched to your language, shift, tools, and remote
              workspace.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-lime px-5 text-sm font-bold text-brand-ink hover:bg-brand-lime-hover"
                href="/jobs"
              >
                Browse verified jobs <ArrowRight size={17} />
              </Link>
              <Link
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-brand-line bg-white px-5 text-sm font-bold text-brand-ink hover:bg-brand-soft"
                href="/for-employers"
              >
                <BriefcaseBusiness size={17} /> Hire remote talent
              </Link>
              <span className="flex items-center gap-1.5 text-xs font-bold text-brand-muted">
                <CheckCircle2 className="text-brand-green" size={15} /> Always free for candidates
              </span>
            </div>
            <form
              action="/jobs"
              className="mt-6 grid grid-cols-[1.2fr_1fr_1fr_auto] rounded-xl border border-brand-line bg-white p-2 shadow-card max-md:grid-cols-2 max-sm:grid-cols-1"
            >
              <label className="flex min-h-14 items-center gap-3 border-r border-brand-line px-3 max-md:border-b max-sm:border-r-0">
                <Search className="text-brand-cool" size={18} />
                <span className="grid flex-1">
                  <small className="text-[10px] font-bold text-brand-muted">What role?</small>
                  <input
                    className="min-w-0 border-0 bg-transparent text-sm font-bold outline-none"
                    name="q"
                    placeholder="Job title or keyword"
                  />
                </span>
              </label>
              <label className="flex min-h-14 items-center gap-3 border-r border-brand-line px-3 max-md:border-b max-sm:border-r-0">
                <SlidersHorizontal className="text-brand-cool" size={18} />
                <span className="grid flex-1">
                  <small className="text-[10px] font-bold text-brand-muted">Process type</small>
                  <select
                    className="min-w-0 border-0 bg-transparent text-sm font-bold outline-none"
                    name="process"
                  >
                    <option value="">All processes</option>
                    <option value="customer_service">Customer service</option>
                    <option value="tech_support">Tech support</option>
                  </select>
                </span>
              </label>
              <label className="flex min-h-14 items-center gap-3 px-3 max-md:border-r max-sm:border-r-0">
                <Languages className="text-brand-cool" size={18} />
                <span className="grid flex-1">
                  <small className="text-[10px] font-bold text-brand-muted">Language</small>
                  <select
                    className="min-w-0 border-0 bg-transparent text-sm font-bold outline-none"
                    name="language"
                  >
                    <option value="">Any language</option>
                    <option value="en">English</option>
                  </select>
                </span>
              </label>
              <button
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-brand-lime px-5 text-sm font-bold text-brand-ink hover:bg-brand-lime-hover"
                type="submit"
              >
                <Search size={17} /> Search jobs
              </button>
            </form>
          </div>
          <div className="scale-panel relative min-h-[460px] overflow-hidden rounded-[30px] border border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_18px_42px_rgba(18,35,39,.06)] max-lg:min-h-[350px]">
            <div className="absolute top-6 left-6 flex items-center gap-3 rounded-xl border border-brand-line bg-white p-4 shadow-lg">
              <ShieldCheck className="text-brand-green" />
              <span className="grid text-xs">
                <b>Verified workplace</b>
                <small className="text-brand-muted">Identity and documents checked</small>
              </span>
            </div>
            <div className="absolute top-6 right-6 grid size-24 place-items-center rounded-full border-[8px] border-brand-lime bg-white text-center shadow-lg">
              <span className="grid">
                <b className="text-xl">94%</b>
                <small className="text-[10px] text-brand-muted">job match</small>
              </span>
            </div>
            <div className="absolute top-1/2 right-6 left-6 flex -translate-y-1/2 items-center gap-3 rounded-xl border border-brand-line bg-white p-5 shadow-xl">
              <span className="grid size-11 place-items-center rounded-lg bg-brand-sage font-bold">
                BP
              </span>
              <span className="grid">
                <small className="text-brand-muted">Featured opportunity</small>
                <b>Customer Support Specialist</b>
                <span className="text-xs text-brand-muted">Remote · Verified employer</span>
              </span>
            </div>
            <div className="absolute right-6 bottom-6 flex items-center gap-3 rounded-xl border border-brand-line bg-white p-4 shadow-lg">
              <Star className="text-amber-500" fill="currentColor" />
              <span className="grid text-xs">
                <b>Trust-led hiring</b>
                <small className="text-brand-muted">Ratings and reporting built in</small>
              </span>
            </div>
          </div>
        </section>
        <TrustStrip />
        <section className="mx-auto max-w-[1200px] px-6 py-20 max-sm:px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[.15em] text-brand-green">
              BUILT FOR REMOTE BPO
            </p>
            <h2 className="mt-3 text-3xl font-bold">Clarity before every application</h2>
            <p className="mt-3 leading-7 text-brand-muted">
              Every role makes process type, language, shift, timezone, tools, and workspace
              expectations visible before candidates invest their time.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {[
              [
                ShieldCheck,
                'Verified employers',
                'Business identity and hiring evidence are reviewed before a role can appear.',
              ],
              [
                Zap,
                'Fit you can understand',
                'Compatibility explains language, tools, and shift overlap instead of hiding the reasoning.',
              ],
              [
                Wifi,
                'Remote-ready detail',
                'Workspace, connectivity, equipment, and timezone needs are visible at a glance.',
              ],
            ].map(([Icon, title, copy]) => (
              <article
                className="rounded-xl border border-brand-line bg-white p-7 shadow-card"
                key={title as string}
              >
                <span className="grid size-12 place-items-center rounded-xl bg-brand-sage text-brand-green">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{copy as string}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
