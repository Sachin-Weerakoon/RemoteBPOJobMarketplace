'use client'

import { useState } from 'react'

export function Toggle({ checked = false, label }: { checked?: boolean; label: string }) {
  const [enabled, setEnabled] = useState(checked)

  return (
    <button
      aria-checked={enabled}
      className="flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-3 focus-visible:outline-brand-focus"
      onClick={() => setEnabled((current) => !current)}
      role="switch"
      type="button"
    >
      <span
        aria-hidden
        className={`relative h-6 w-11 rounded-full transition ${enabled ? 'bg-brand-lime' : 'bg-brand-cool'}`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition ${enabled ? 'left-[22px]' : 'left-0.5'}`}
        />
      </span>
      <span className="text-sm font-bold text-brand-ink">{label}</span>
    </button>
  )
}
