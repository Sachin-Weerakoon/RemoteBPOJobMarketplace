'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { apiRequest } from '@/lib/api-client'

export function SaveButton({ jobId }: { jobId?: string }) {
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  async function toggle() {
    if (!jobId) {
      setSaved((value) => !value)
      return
    }
    setBusy(true)
    try {
      const result = await apiRequest<{ saved: boolean }>(`/candidate/saved/${jobId}`, {
        method: 'POST',
      })
      setSaved(result.saved)
    } catch (caught) {
      if (caught instanceof Error && caught.message === 'Authentication required.') {
        window.location.href = '/login'
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      aria-label={saved ? 'Remove saved job' : 'Save job'}
      aria-pressed={saved}
      className="grid size-11 place-items-center rounded-lg border border-brand-line bg-white text-brand-muted transition hover:bg-brand-soft aria-pressed:text-brand-green"
      disabled={busy}
      onClick={toggle}
      type="button"
    >
      <Heart fill={saved ? 'currentColor' : 'none'} size={19} />
    </button>
  )
}
