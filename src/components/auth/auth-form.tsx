'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Alert } from '@/components/ui/display'
import { apiRequest } from '@/lib/api-client'
import type { Profile, Role } from '@/lib/app-types'

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [role, setRole] = useState<Exclude<Role, 'admin'>>('candidate')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '').trim()
    const password = String(form.get('password') || '')
    try {
      if (mode === 'register') {
        const displayName = String(form.get('displayName') || '').trim()
        const companyName = String(form.get('companyName') || '').trim()
        const { profile } = await apiRequest<{ profile: Profile }>('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ email, password, role, displayName, companyName }),
        })
        router.push(profile.role === 'employer' ? '/employer' : '/candidate')
      } else {
        const { profile } = await apiRequest<{ profile: Profile }>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        })
        router.push(
          profile.role === 'admin'
            ? '/operations'
            : profile.role === 'employer'
              ? '/employer'
              : '/candidate',
        )
      }
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Authentication failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="grid gap-5" onSubmit={submit}>
      {error && <Alert tone={error.startsWith('Check') ? 'success' : 'error'}>{error}</Alert>}
      {mode === 'register' && (
        <>
          <fieldset>
            <legend className="mb-2 text-sm font-bold text-brand-ink">I am joining as</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['candidate', 'employer'] as const).map((option) => (
                <label
                  className={`cursor-pointer rounded-lg border p-3 text-center text-sm font-bold capitalize ${role === option ? 'border-brand-lime bg-brand-sage text-brand-ink' : 'border-brand-line text-brand-muted'}`}
                  key={option}
                >
                  <input
                    checked={role === option}
                    className="sr-only"
                    name="role"
                    onChange={() => setRole(option)}
                    type="radio"
                    value={option}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="grid gap-2 text-sm font-bold text-brand-ink">
            {role === 'employer' ? 'Your name' : 'Full name'}
            <input
              className="min-h-11 rounded-lg border border-brand-line bg-brand-soft px-3 font-normal outline-none focus:border-brand-lime"
              name="displayName"
              required
            />
          </label>
          {role === 'employer' && (
            <label className="grid gap-2 text-sm font-bold text-brand-ink">
              Company name
              <input
                className="min-h-11 rounded-lg border border-brand-line bg-brand-soft px-3 font-normal outline-none focus:border-brand-lime"
                name="companyName"
                required
              />
            </label>
          )}
        </>
      )}
      <label className="grid gap-2 text-sm font-bold text-brand-ink">
        Email address
        <input
          autoComplete="email"
          className="min-h-11 rounded-lg border border-brand-line bg-brand-soft px-3 font-normal outline-none focus:border-brand-lime"
          name="email"
          required
          type="email"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-brand-ink">
        Password
        <input
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          className="min-h-11 rounded-lg border border-brand-line bg-brand-soft px-3 font-normal outline-none focus:border-brand-lime"
          minLength={8}
          name="password"
          required
          type="password"
        />
      </label>
      <button
        className="min-h-12 rounded-lg bg-brand-lime px-5 text-sm font-bold text-brand-ink hover:bg-brand-lime-hover disabled:opacity-60"
        disabled={submitting}
      >
        {submitting ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
      </button>
      <p className="text-center text-sm text-brand-muted">
        {mode === 'login' ? 'New to RemoteBPO Hub?' : 'Already have an account?'}{' '}
        <Link
          className="font-bold text-brand-green hover:underline"
          href={mode === 'login' ? '/register' : '/login'}
        >
          {mode === 'login' ? 'Create an account' : 'Sign in'}
        </Link>
      </p>
    </form>
  )
}
