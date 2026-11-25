import { AuthForm } from '@/components/auth/auth-form'
import { Logo } from '@/components/layout/logo'

export default function RegisterPage() {
  return (
    <main className="arowana-texture grid min-h-screen place-items-center px-5 py-12">
      <section className="w-full max-w-md rounded-2xl border border-brand-line bg-white p-7 shadow-xl sm:p-9">
        <Logo />
        <p className="mt-8 text-xs font-bold tracking-widest text-brand-green uppercase">
          Create your workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-ink">
          Start with a trusted profile
        </h1>
        <p className="mt-2 text-sm leading-6 text-brand-muted">
          Candidate accounts are always free. Employer profiles are reviewed before jobs can be
          published.
        </p>
        <div className="mt-7">
          <AuthForm mode="register" />
        </div>
      </section>
    </main>
  )
}
