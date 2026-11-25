'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from './core'

function Modal({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode
  onClose: () => void
  title: string
}) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    dialog?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialog) return
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previous?.focus()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-brand-ink/55 p-4"
      onMouseDown={onClose}
    >
      <div
        aria-modal="true"
        className="w-full max-w-lg rounded-2xl border border-brand-line bg-white p-6 shadow-2xl outline-none"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-wider text-brand-green uppercase">
              Component demo
            </p>
            <h2 className="mt-1 text-xl font-bold text-brand-ink">{title}</h2>
          </div>
          <button
            aria-label="Close modal"
            className="grid size-11 place-items-center rounded-lg hover:bg-brand-soft"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </header>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}

export function InteractiveDemo() {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(false)

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setOpen(true)}>Open accessible modal</Button>
        <Button onClick={() => setToast(true)} variant="secondary">
          Show success toast
        </Button>
      </div>
      {open && (
        <Modal onClose={() => setOpen(false)} title="Application ready">
          <div className="flex items-start gap-3 rounded-xl bg-brand-soft p-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-lime text-brand-ink">
              <Check size={18} />
            </span>
            <div>
              <b className="text-brand-ink">All required details are complete</b>
              <p className="mt-1 text-sm text-brand-muted">
                The modal traps focus, closes with Escape, and returns focus to its trigger.
              </p>
            </div>
          </div>
          <Button className="mt-5 w-full" onClick={() => setOpen(false)}>
            Continue
          </Button>
        </Modal>
      )}
      {toast && (
        <div
          className="fixed right-5 bottom-5 z-50 flex max-w-sm items-center gap-3 rounded-xl bg-brand-ink p-4 text-sm text-white shadow-2xl"
          role="status"
        >
          <Check className="text-brand-lime" size={18} />
          <span className="flex-1">Changes saved successfully.</span>
          <button
            aria-label="Dismiss notification"
            className="grid size-11 place-items-center"
            onClick={() => setToast(false)}
          >
            <X size={17} />
          </button>
        </div>
      )}
    </>
  )
}

export function ButtonDemo() {
  const [message, setMessage] = useState('Choose an action to preview feedback.')
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setMessage('Primary action selected.')}>Primary action</Button>
        <Button onClick={() => setMessage('Secondary action selected.')} variant="secondary">
          Secondary
        </Button>
        <Button onClick={() => setMessage('Ghost action selected.')} variant="ghost">
          Ghost
        </Button>
        <Button
          onClick={() => setMessage('Destructive action requires confirmation.')}
          variant="destructive"
        >
          Destructive
        </Button>
        <Button disabled>Disabled</Button>
      </div>
      <p aria-live="polite" className="mt-3 text-xs text-brand-muted">
        {message}
      </p>
    </div>
  )
}
