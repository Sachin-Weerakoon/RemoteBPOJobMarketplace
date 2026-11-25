'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { MobileTabs } from '@/components/layout/mobile-tabs'
import { SideNav } from '@/components/layout/side-nav'
import { apiRequest } from '@/lib/api-client'
import type { Profile, Role } from '@/lib/app-types'

const WorkspaceContext = createContext<{
  profile: Profile
  refreshProfile: () => Promise<void>
} | null>(null)

export function useWorkspace() {
  const value = useContext(WorkspaceContext)
  if (!value) throw new Error('useWorkspace must be used within WorkspaceProvider')
  return value
}

export function WorkspaceProvider({ children, role }: { children: React.ReactNode; role: Role }) {
  const router = useRouter()
  const pathname = usePathname()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState('')

  async function refreshProfile() {
    const { profile: next } = await apiRequest<{ profile: Profile }>('/me')
    setProfile(next)
  }

  useEffect(() => {
    refreshProfile().catch((caught) => {
      if (caught instanceof Error && caught.message === 'Authentication required.') {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`)
        return
      }
      setError(caught instanceof Error ? caught.message : 'Could not load your workspace.')
    })
  }, [pathname, router])

  useEffect(() => {
    if (!profile || profile.role === role) return
    router.replace(
      profile.role === 'admin'
        ? '/operations'
        : profile.role === 'employer'
          ? '/employer'
          : '/candidate',
    )
  }, [profile, role, router])

  async function logout() {
    await apiRequest('/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center p-6 text-center text-brand-danger">
        {error}
      </main>
    )
  }
  if (!profile || profile.role !== role) {
    return (
      <main className="grid min-h-screen place-items-center p-6 text-sm font-bold text-brand-muted">
        Loading your secure workspace…
      </main>
    )
  }

  return (
    <WorkspaceContext.Provider value={{ profile, refreshProfile }}>
      <div className="min-h-screen bg-brand-canvas lg:flex">
        <div className="hidden lg:block">
          <SideNav
            active={activeLabel(pathname, role)}
            displayName={profile.displayName}
            role={role}
          />
        </div>
        <div className="min-w-0 flex-1 pb-20 lg:pb-0">
          <div className="flex justify-end border-b border-brand-line bg-white px-5 py-2">
            <button
              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-bold text-brand-muted hover:bg-brand-soft"
              onClick={logout}
              type="button"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
          <WorkspaceContext.Provider value={{ profile, refreshProfile }}>
            {children}
          </WorkspaceContext.Provider>
        </div>
        {role !== 'admin' && (
          <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
            <MobileTabs employer={role === 'employer'} />
          </div>
        )}
      </div>
    </WorkspaceContext.Provider>
  )
}

function activeLabel(pathname: string, role: Role) {
  if (role === 'admin') return pathname.includes('verifications') ? 'Verifications' : 'Overview'
  if (role === 'candidate') {
    if (pathname.includes('applications')) return 'Applications'
    if (pathname.includes('saved')) return 'Saved jobs'
    if (pathname.includes('profile')) return 'Profile'
    if (pathname.includes('assessment')) return 'Assessment'
    return 'Dashboard'
  }
  if (pathname.includes('applicants')) return 'Applicants'
  if (pathname.includes('jobs')) return 'My jobs'
  if (pathname.includes('company')) return 'Company'
  return 'Dashboard'
}
