import { AuthForm } from '@/components/auth/auth-form'
import { Logo } from '@/components/layout/logo'

export default function LoginPage() {
  return (
    <main className="arowana-texture grid min-h-screen place-items-center px-5 py-12">
      <section className="w-full max-w-md rounded-2xl border border-brand-line bg-white p-7 shadow-xl sm:p-9">
        <Logo />
        <p className="mt-8 text-xs font-bold tracking-widest text-brand-green uppercase">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-ink">
          Sign in to your workspace
        </h1>
        <p className="mt-2 text-sm leading-6 text-brand-muted">
          Continue your job search or manage your hiring pipeline.
        </p>
        <div className="mt-7">
          <AuthForm mode="login" />
        </div>
      </section>
    </main>
  )
}
