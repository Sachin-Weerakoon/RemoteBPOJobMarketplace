import { Fragment } from 'react'
import { CalendarDays, FileUp, Filter, GripVertical } from 'lucide-react'
import { Badge, Checkbox, SelectField, StatusChip } from './core'

export function FileUpload() {
  return (
    <label className="grid min-h-44 cursor-pointer place-items-center rounded-xl border border-dashed border-brand-cool bg-brand-soft p-6 text-center transition hover:border-brand-lime">
      <input className="sr-only" type="file" />
      <span>
        <FileUp className="mx-auto text-brand-green" size={28} />
        <b className="mt-3 block text-sm text-brand-ink">Choose a file to upload</b>
        <small className="mt-1 block text-brand-muted">PDF, DOCX, or PNG up to 10 MB</small>
      </span>
    </label>
  )
}

export function AvailabilityGrid() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const periods = ['Morning', 'Afternoon', 'Evening']
  return (
    <fieldset>
      <legend className="mb-3 flex items-center gap-2 text-sm font-bold text-brand-ink">
        <CalendarDays size={17} />
        Weekly availability
      </legend>
      <div className="overflow-x-auto">
        <div className="grid min-w-[520px] grid-cols-[110px_repeat(5,1fr)] gap-1 text-center text-xs">
          <span />
          {days.map((day) => (
            <b className="p-2 text-brand-muted" key={day}>
              {day}
            </b>
          ))}
          {periods.map((period, row) => (
            <Fragment key={period}>
              <b className="p-2 text-left text-brand-muted" key={`${period}-label`}>
                {period}
              </b>
              {days.map((day, column) => (
                <label
                  className="grid min-h-11 cursor-pointer place-items-center rounded-md bg-brand-soft has-checked:bg-brand-lime"
                  key={`${period}-${day}`}
                >
                  <input
                    aria-label={`${day} ${period}`}
                    className="sr-only"
                    defaultChecked={(row + column) % 3 !== 0}
                    type="checkbox"
                  />
                  <span aria-hidden className="size-2 rounded-full bg-brand-cool" />
                </label>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </fieldset>
  )
}

export function FilterPanel() {
  return (
    <aside className="rounded-xl border border-brand-line bg-white p-5 shadow-card">
      <h3 className="flex items-center gap-2 font-bold text-brand-ink">
        <Filter size={17} />
        Filter roles
      </h3>
      <div className="mt-4 grid gap-4">
        <SelectField defaultValue="all" id="kit-process" label="Process">
          <option value="all">All processes</option>
          <option value="support">Customer support</option>
          <option value="back-office">Back office</option>
        </SelectField>
        <div>
          <p className="mb-2 text-sm font-bold text-brand-ink">Work setup</p>
          <Checkbox defaultChecked label="Remote" />
          <Checkbox label="Hybrid" />
        </div>
      </div>
    </aside>
  )
}

export function DataTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-brand-line bg-white">
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="sr-only">Application table component example</caption>
        <thead className="bg-brand-soft text-xs tracking-wide text-brand-muted uppercase">
          <tr>
            <th className="p-4">Candidate</th>
            <th className="p-4">Role</th>
            <th className="p-4">Match</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-line text-brand-ink">
          <tr>
            <td className="p-4 font-bold">Sample candidate</td>
            <td className="p-4">Support specialist</td>
            <td className="p-4">86%</td>
            <td className="p-4">
              <StatusChip>Shortlisted</StatusChip>
            </td>
          </tr>
          <tr>
            <td className="p-4 font-bold">Example profile</td>
            <td className="p-4">Data processor</td>
            <td className="p-4">78%</td>
            <td className="p-4">
              <Badge>Screening</Badge>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function KanbanBoard() {
  const columns = [
    ['Applied', 'New application'],
    ['Screening', 'Skills review'],
    ['Interview', 'Interview scheduled'],
  ]
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {columns.map(([title, card]) => (
        <section className="rounded-xl bg-brand-soft p-3" key={title}>
          <h3 className="px-1 text-xs font-bold tracking-wide text-brand-muted uppercase">
            {title}
          </h3>
          <article className="mt-3 rounded-lg border border-brand-line bg-white p-4 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <b className="text-sm text-brand-ink">{card}</b>
                <p className="mt-1 text-xs text-brand-muted">Workflow component example</p>
              </div>
              <GripVertical aria-hidden className="text-brand-cool" size={17} />
            </div>
          </article>
        </section>
      ))}
    </div>
  )
}
