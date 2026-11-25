'use client'

import { useState } from 'react'

export function Tabs({ active, items }: { active: string; items: readonly string[] }) {
  const [selected, setSelected] = useState(active)

  return (
    <div aria-label="Section navigation" className="flex gap-1 overflow-x-auto" role="tablist">
      {items.map((item) => (
        <button
          aria-selected={item === selected}
          className={`min-h-11 rounded-lg px-4 text-sm font-bold whitespace-nowrap ${item === selected ? 'bg-brand-ink text-brand-lime' : 'text-brand-muted hover:bg-brand-soft'}`}
          key={item}
          onClick={() => setSelected(item)}
          role="tab"
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  )
}
