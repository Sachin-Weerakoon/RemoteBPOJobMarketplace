import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  FileCheck2,
  FileText,
  Filter,
  Flag,
  Globe2,
  Heart,
  HelpCircle,
  Home,
  Languages,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Timer,
  UploadCloud,
  Users,
  Wifi,
  X,
  Zap,
} from 'lucide-react'

type Page = 'home' | 'jobs' | 'job' | 'candidate' | 'employer' | 'pipeline' | 'admin' | 'kit'

const jobs = [
  {
    company: 'Cloudstaff Pro',
    initials: 'CP',
    title: 'Customer Support Specialist',
    process: 'Customer Service',
    mode: 'Voice',
    language: 'English C1',
    shift: 'US hours · GMT-5',
    salary: '$900–$1,200 / month',
    tools: ['Zendesk', 'Slack'],
    match: 94,
    posted: '2h ago',
    color: '#e5efe2',
  },
  {
    company: 'NexaCare Solutions',
    initials: 'NC',
    title: 'Healthcare Claims Associate',
    process: 'Healthcare BPO',
    mode: 'Non-Voice',
    language: 'English B2',
    shift: 'Day shift · GMT+8',
    salary: '$750–$980 / month',
    tools: ['Salesforce', 'Excel'],
    match: 88,
    posted: 'Today',
    color: '#edf1df',
  },
  {
    company: 'Vertex Global',
    initials: 'VG',
    title: 'Technical Support Advisor',
    process: 'Technical Support',
    mode: 'Voice',
    language: 'English C1',
    shift: 'Rotating · UTC',
    salary: '$1,100–$1,450 / month',
    tools: ['Jira', 'Intercom'],
    match: 82,
    posted: '1d ago',
    color: '#e2eddf',
  },
]

const statuses = [
  ['Applied', '26', 'blue'],
  ['Under review', '12', 'amber'],
  ['Assessment', '8', 'purple'],
  ['Interview', '5', 'teal'],
  ['Offer', '2', 'green'],
]

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className="logo"
      onClick={onClick ?? (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
      aria-label="RemoteBPO Hub home"
    >
      <span className="logo-mark">R</span>
      <span>
        RemoteBPO <b>Hub</b>
      </span>
    </button>
  )
}

function Badge({ children, tone = 'slate' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

function Header({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="header-inner">
        <Logo
          onClick={() => {
            setPage('home')
            setOpen(false)
          }}
        />
        <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
          <button
            aria-current={page === 'jobs' ? 'page' : undefined}
            className={page === 'jobs' ? 'active' : ''}
            onClick={() => {
              setPage('jobs')
              setOpen(false)
            }}
          >
            Find jobs
          </button>
          <button
            onClick={() => {
              setPage('home')
              setOpen(false)
            }}
          >
            Companies
          </button>
          <button
            onClick={() => {
              setPage('employer')
              setOpen(false)
            }}
          >
            For employers
          </button>
          <button
            onClick={() => {
              setPage('kit')
              setOpen(false)
            }}
          >
            UI kit
          </button>
        </nav>
        <div className="header-actions">
          <button className="btn ghost desktop-only" onClick={() => setPage('candidate')}>
            Sign in
          </button>
          <button className="btn primary desktop-only" onClick={() => setPage('candidate')}>
            Create account
          </button>
          <button
            className="icon-button mobile-only"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}

function TrustStrip() {
  return (
    <div className="trust-strip">
      <div>
        <ShieldCheck size={20} />
        <b>Verified employers only</b>
      </div>
      <span>Identity, registration, and hiring domain reviewed before posting</span>
      <div className="trust-strip-proof">
        <CheckCircle2 size={16} /> No application fees
      </div>
      <div className="trust-strip-proof">
        <Clock3 size={16} /> Reports reviewed within 24h
      </div>
      <button>
        How verification works <ArrowRight size={15} />
      </button>
    </div>
  )
}

function JobCard({ job, onOpen }: { job: (typeof jobs)[number]; onOpen: () => void }) {
  const [saved, setSaved] = useState(false)
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-logo" style={{ background: job.color }}>
          {job.initials}
        </div>
        <div className="job-head">
          <div className="company-line">
            {job.company}{' '}
            <Badge tone="verified">
              <ShieldCheck size={12} /> Verified
            </Badge>
          </div>
          <button className="job-title" onClick={onOpen}>
            {job.title}
          </button>
        </div>
        <button
          className={`icon-button save ${saved ? 'saved' : ''}`}
          onClick={() => setSaved(!saved)}
          aria-label={saved ? 'Remove saved job' : 'Save job'}
          aria-pressed={saved}
        >
          <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="badge-row">
        <Badge tone="blue">{job.process}</Badge>
        <Badge>{job.mode}</Badge>
        <Badge tone="remote">
          <Wifi size={12} /> Remote
        </Badge>
      </div>
      <div className="job-facts">
        <span>
          <Languages size={16} />
          {job.language}
        </span>
        <span>
          <Clock3 size={16} />
          {job.shift}
        </span>
        <span>
          <BriefcaseBusiness size={16} />
          {job.salary}
        </span>
      </div>
      <div className="tools">
        {job.tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <div className="match-meter" aria-label={`${job.match}% compatibility`}>
        <div>
          <span>Profile match</span>
          <b>{job.match}%</b>
        </div>
        <i>
          <span style={{ width: `${job.match}%` }} />
        </i>
      </div>
      <div className="job-footer">
        <span className="muted">Posted {job.posted}</span>
        <div className="response-time">
          <Zap size={12} /> Usually responds in 2 days
        </div>
        <button className="btn secondary small" onClick={onOpen}>
          View job
        </button>
      </div>
    </article>
  )
}

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-content">
            <Badge tone="remote">
              <ShieldCheck size={13} /> Trusted remote BPO jobs
            </Badge>
            <h1>
              Remote BPO work.
              <br />
              <span>Real companies.</span> Better fit.
            </h1>
            <p>
              Find verified opportunities matched to your language, shift, tools, and remote
              workspace.
            </p>
            <div className="hero-actions">
              <button className="btn primary" onClick={() => setPage('jobs')}>
                Browse verified jobs <ArrowRight size={17} />
              </button>
              <button className="btn secondary" onClick={() => setPage('employer')}>
                <Building2 size={17} /> Hire remote talent
              </button>
              <span>
                <CheckCircle2 size={15} /> Always free for candidates
              </span>
            </div>
            <div className="search-box">
              <label>
                <Search size={19} />
                <span>
                  <small>What role?</small>
                  <input aria-label="Job title or keyword" placeholder="Job title or keyword" />
                </span>
              </label>
              <label>
                <SlidersHorizontal size={19} />
                <span>
                  <small>Process type</small>
                  <select aria-label="Process type">
                    <option>All processes</option>
                    <option>Customer service</option>
                    <option>Tech support</option>
                  </select>
                </span>
              </label>
              <label>
                <Languages size={19} />
                <span>
                  <small>Language</small>
                  <select aria-label="Language">
                    <option>Any language</option>
                    <option>English</option>
                    <option>Spanish</option>
                  </select>
                </span>
              </label>
              <button className="btn primary search-cta" onClick={() => setPage('jobs')}>
                <Search size={18} /> Search jobs
              </button>
            </div>
            <div className="quick-filters">
              <span>Popular:</span>
              {['Voice', 'Non-Voice', 'Tech Support', 'Data Entry', 'Content Moderation'].map(
                (x) => (
                  <button key={x} onClick={() => setPage('jobs')}>
                    {x}
                  </button>
                ),
              )}
            </div>
            <div className="hero-proof">
              <div>
                <b>320+</b>
                <span>live remote roles</span>
              </div>
              <div>
                <b>68</b>
                <span>verified employers</span>
              </div>
              <div>
                <b>4.8/5</b>
                <span>candidate trust score</span>
              </div>
            </div>
          </div>
          <div className="hero-panel hero-panel-contained">
            <div className="floating-card trust-card">
              <ShieldCheck />
              <div>
                <b>Verified workplace</b>
                <span>Identity & documents checked</span>
              </div>
            </div>
            <div className="match-ring">
              <div>
                <b>94%</b>
                <span>job match</span>
              </div>
            </div>
            <div className="mini-job">
              <div className="company-logo">BP</div>
              <div>
                <small>Featured opportunity</small>
                <b>Customer Support Specialist</b>
                <span>Remote · $1,200/mo</span>
              </div>
            </div>
            <div className="floating-card rating-card">
              <Star fill="currentColor" />
              <div>
                <b>4.8 / 5</b>
                <span>Candidate trust rating</span>
              </div>
            </div>
          </div>
        </section>
        <TrustStrip />

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">HAND-PICKED FOR YOU</span>
              <h2>Featured remote jobs</h2>
              <p>Recently posted roles from employers we’ve verified.</p>
            </div>
            <button className="text-button" onClick={() => setPage('jobs')}>
              View all jobs <ArrowRight size={17} />
            </button>
          </div>
          <div className="job-grid">
            {jobs.map((job) => (
              <JobCard key={job.title} job={job} onOpen={() => setPage('job')} />
            ))}
          </div>
        </section>

        <section className="section company-section">
          <div className="section-head">
            <div>
              <span className="eyebrow">EMPLOYERS YOU CAN TRUST</span>
              <h2>Top verified companies</h2>
            </div>
          </div>
          <div className="company-grid">
            {[
              ['Cloudstaff Pro', 'Customer support', '4.9', '12 open roles', 'CP'],
              ['NexaCare Solutions', 'Healthcare operations', '4.7', '8 open roles', 'NC'],
              ['Vertex Global', 'Technical support', '4.8', '6 open roles', 'VG'],
            ].map((c) => (
              <article className="company-card" key={c[0]}>
                <div className="company-logo large">{c[4]}</div>
                <div>
                  <h3>
                    {c[0]} <ShieldCheck size={16} />
                  </h3>
                  <p>{c[1]}</p>
                  <span>
                    <Star size={15} fill="currentColor" /> {c[2]} · {c[3]}
                  </span>
                </div>
                <ChevronRight />
              </article>
            ))}
          </div>
        </section>

        <section className="section how-section">
          <div className="center-head">
            <span className="eyebrow">SIMPLE BY DESIGN</span>
            <h2>Your next remote role in three steps</h2>
            <p>Build one profile, prove your strengths, and apply with confidence.</p>
          </div>
          <div className="step-grid">
            {[
              [
                CircleUserRound,
                '01',
                'Create your profile',
                'Add your languages, tools, work setup, and preferred shifts.',
              ],
              [
                Zap,
                '02',
                'See your best matches',
                'Get a clear compatibility score before you spend time applying.',
              ],
              [
                Send,
                '03',
                'Apply and track',
                'Use your saved profile and follow every application in one place.',
              ],
            ].map(([Icon, n, t, d]: any) => (
              <article className="step-card" key={n}>
                <span className="step-number">{n}</span>
                <div className="step-icon">
                  <Icon />
                </div>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="safety-band">
          <div>
            <ShieldCheck size={32} />
            <span>
              <b>Built to keep job seekers safe</b>
              <small>We never allow employers to charge application or equipment fees.</small>
            </span>
          </div>
          <div className="safety-points">
            <span>
              <CheckCircle2 /> Verified identity
            </span>
            <span>
              <CheckCircle2 /> Visible ratings
            </span>
            <span>
              <CheckCircle2 /> One-tap reporting
            </span>
          </div>
          <button className="btn secondary">Read safety tips</button>
        </section>
      </main>
      <Footer />
    </>
  )
}

function FilterPanel({ mobile = false, close }: { mobile?: boolean; close?: () => void }) {
  return (
    <aside className={mobile ? 'filter-panel mobile-filter' : 'filter-panel'}>
      <div className="filter-title">
        <h3>Filters</h3>
        {mobile ? (
          <button className="icon-button" onClick={close}>
            <X />
          </button>
        ) : (
          <button>Clear all</button>
        )}
      </div>
      {[
        ['Process type', ['Customer service', 'Technical support', 'Healthcare BPO', 'Data entry']],
        ['Work style', ['Voice', 'Non-Voice', 'Blended']],
        ['Shift & timezone', ['My timezone ±2h', 'Day shift', 'Night shift']],
        ['Experience', ['Entry level', '1–2 years', '3+ years']],
      ].map(([heading, opts]: any, groupIndex) => (
        <div className="filter-group" key={heading}>
          <h4>
            {heading}
            <ChevronDown size={16} />
          </h4>
          {opts.map((o: string, i: number) => (
            <label key={o}>
              <input type="checkbox" defaultChecked={heading === 'Process type' && i === 0} />
              <span>{o}</span>
              <small>
                {[86, 42, 31, 57, 88, 73, 29, 96, 61, 44, 92, 55][groupIndex * 4 + i] ?? 24}
              </small>
            </label>
          ))}
        </div>
      ))}
      <div className="filter-group">
        <h4>Monthly salary</h4>
        <div className="salary-inputs">
          <input placeholder="$ Min" />
          <input placeholder="$ Max" />
        </div>
      </div>
      {mobile && (
        <div className="filter-actions">
          <button className="btn secondary">Clear</button>
          <button className="btn primary" onClick={close}>
            Show 146 jobs
          </button>
        </div>
      )}
    </aside>
  )
}

function JobsPage({ setPage }: { setPage: (p: Page) => void }) {
  const [filters, setFilters] = useState(false)
  return (
    <main className="page-shell">
      <div className="breadcrumb">
        Home <ChevronRight size={14} /> Remote jobs
      </div>
      <div className="listing-search">
        <div>
          <Search />
          <input defaultValue="Customer support" aria-label="Search jobs" />
        </div>
        <div>
          <Globe2 />
          <select>
            <option>Anywhere (Remote)</option>
          </select>
        </div>
        <button className="btn primary">Search</button>
      </div>
      <div className="listing-layout">
        <FilterPanel />
        <section className="results">
          <div className="results-head">
            <div>
              <h1>Remote BPO jobs</h1>
              <p>
                <b>146 verified roles</b> matched to your search
              </p>
            </div>
            <div>
              <button className="btn secondary filter-mobile-btn" onClick={() => setFilters(true)}>
                <Filter size={18} /> Filters
              </button>
              <select aria-label="Sort jobs">
                <option>Most relevant</option>
                <option>Newest</option>
                <option>Highest salary</option>
              </select>
            </div>
          </div>
          <div className="alert info">
            <Bell size={18} />
            <span>
              <b>Get new matches in your inbox</b>
              <small>Create an alert for “Customer support · Remote”</small>
            </span>
            <button className="btn secondary small">Create alert</button>
          </div>
          <div className="result-stack">
            {[...jobs, jobs[0]].map((job, i) => (
              <JobCard
                key={i}
                job={{ ...job, match: Math.max(76, job.match - i) }}
                onOpen={() => setPage('job')}
              />
            ))}
          </div>
          <div className="pagination">
            <button disabled>
              <ArrowLeft />
            </button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <span>…</span>
            <button>12</button>
            <button>
              <ArrowRight />
            </button>
          </div>
        </section>
      </div>
      {filters && (
        <div className="overlay">
          <FilterPanel mobile close={() => setFilters(false)} />
        </div>
      )}
    </main>
  )
}

function JobDetail({ setPage }: { setPage: (p: Page) => void }) {
  const [apply, setApply] = useState(false)
  return (
    <main className="page-shell detail-shell">
      <button className="back-link" onClick={() => setPage('jobs')}>
        <ArrowLeft size={17} /> Back to jobs
      </button>
      <section className="detail-hero">
        <div className="company-logo xlarge">CP</div>
        <div className="detail-title">
          <div className="company-line">
            Cloudstaff Pro{' '}
            <Badge tone="verified">
              <ShieldCheck size={12} /> Verified
            </Badge>
          </div>
          <h1>Customer Support Specialist</h1>
          <div className="badge-row">
            <Badge tone="blue">Customer Service</Badge>
            <Badge>Voice</Badge>
            <Badge tone="remote">
              <Wifi size={12} /> Fully remote
            </Badge>
          </div>
        </div>
        <div className="detail-actions">
          <button className="icon-button">
            <Heart />
          </button>
          <button className="btn primary" onClick={() => setApply(true)}>
            Apply now
          </button>
        </div>
      </section>
      <div className="detail-layout">
        <article className="detail-content">
          <div className="facts-grid">
            {[
              ['Salary', '$900–$1,200/mo'],
              ['Shift', '9am–6pm EST'],
              ['Experience', '1+ year'],
              ['Language', 'English C1'],
              ['Typing speed', '45 WPM'],
              ['Deadline', 'June 30'],
            ].map((x) => (
              <div key={x[0]}>
                <small>{x[0]}</small>
                <b>{x[1]}</b>
              </div>
            ))}
          </div>
          <section>
            <h2>About the role</h2>
            <p>
              Join Cloudstaff Pro’s fully remote customer experience team. You’ll help customers
              solve account and product questions across phone, email, and live chat while working
              with a supportive global team.
            </p>
          </section>
          <section>
            <h2>What you’ll do</h2>
            <ul>
              {[
                'Resolve customer questions with clarity and empathy',
                'Document each interaction accurately in Zendesk',
                'Meet service quality and response-time targets',
                'Share recurring customer insights with the product team',
              ].map((x) => (
                <li key={x}>
                  <CheckCircle2 />
                  {x}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Remote workspace requirements</h2>
            <div className="checklist">
              {[
                'Quiet, dedicated workspace',
                '25 Mbps stable internet',
                'USB noise-cancelling headset',
                'Power backup for 2+ hours',
              ].map((x) => (
                <span key={x}>
                  <Check />
                  {x}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h2>Tools you’ll use</h2>
            <div className="tools big">
              <span>Zendesk</span>
              <span>Slack</span>
              <span>Google Workspace</span>
              <span>Dialpad</span>
            </div>
          </section>
          <button className="report-link">
            <Flag size={16} /> Report this job
          </button>
        </article>
        <aside className="detail-aside">
          <div className="match-panel">
            <div className="mini-ring">94%</div>
            <div>
              <b>Excellent match</b>
              <span>Your profile matches 8 of 9 requirements</span>
            </div>
          </div>
          <button className="btn primary wide" onClick={() => setApply(true)}>
            Apply with profile
          </button>
          <button className="btn secondary wide">
            <Heart size={17} /> Save job
          </button>
          <div className="company-summary">
            <div className="company-logo">CP</div>
            <h3>Cloudstaff Pro</h3>
            <Badge tone="verified">
              <ShieldCheck size={12} /> Verified employer
            </Badge>
            <p>Global customer experience partner · 500–1,000 employees</p>
            <span className="rating">
              <Star fill="currentColor" /> <b>4.9</b> from 128 reviews
            </span>
            <button className="text-button">
              View company profile <ArrowRight size={15} />
            </button>
          </div>
        </aside>
      </div>
      <div className="mobile-sticky">
        <span>
          <b>$900–$1,200</b>
          <small>per month</small>
        </span>
        <button className="btn primary" onClick={() => setApply(true)}>
          Apply now
        </button>
      </div>
      {apply && <ApplyModal close={() => setApply(false)} />}
    </main>
  )
}

function ApplyModal({ close }: { close: () => void }) {
  const [step, setStep] = useState(1)
  const [sent, setSent] = useState(false)
  if (sent)
    return (
      <div className="overlay modal-overlay">
        <div className="modal success-modal">
          <div className="success-icon">
            <Check />
          </div>
          <h2>Application sent!</h2>
          <p>Cloudstaff Pro has received your application. Track updates from your dashboard.</p>
          <button className="btn primary wide" onClick={close}>
            View my applications
          </button>
        </div>
      </div>
    )
  return (
    <div className="overlay modal-overlay">
      <div className="modal">
        <div className="modal-head">
          <div>
            <small>APPLYING TO</small>
            <h2>Customer Support Specialist</h2>
          </div>
          <button className="icon-button" onClick={close}>
            <X />
          </button>
        </div>
        <div className="progress-line">
          <span style={{ width: `${step * 33.33}%` }} />
        </div>
        <div className="modal-steps">
          <span className={step >= 1 ? 'active' : ''}>1 Profile</span>
          <span className={step >= 2 ? 'active' : ''}>2 Questions</span>
          <span className={step >= 3 ? 'active' : ''}>3 Review</span>
        </div>
        {step === 1 && (
          <div className="modal-body">
            <h3>Review your application profile</h3>
            <div className="profile-row">
              <div className="avatar">AM</div>
              <div>
                <b>Alex Morgan</b>
                <span>Customer Support Specialist · Manila, PH</span>
              </div>
              <button className="text-button">Edit</button>
            </div>
            <div className="file-row">
              <FileText />
              <div>
                <b>Alex_Morgan_Resume.pdf</b>
                <span>Updated 3 days ago · 1.2 MB</span>
              </div>
              <CheckCircle2 className="success-text" />
            </div>
            <div className="alert good">
              <CheckCircle2 />
              <span>
                <b>Your profile is 92% complete</b>
                <small>Strong profiles are more likely to get responses.</small>
              </span>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="modal-body">
            <h3>A couple of quick questions</h3>
            <label className="field">
              <span>Are you available to work 9am–6pm EST?</span>
              <select>
                <option>Yes, I’m available</option>
                <option>No</option>
              </select>
            </label>
            <label className="field">
              <span>Briefly describe your Zendesk experience</span>
              <textarea placeholder="I have used Zendesk for..." rows={4} />
              <small>Optional · 300 characters max</small>
            </label>
          </div>
        )}
        {step === 3 && (
          <div className="modal-body">
            <h3>Ready to apply?</h3>
            <div className="review-box">
              <span>
                <Check /> Profile and resume
              </span>
              <span>
                <Check /> Availability confirmed
              </span>
              <span>
                <Check /> Employer questions answered
              </span>
            </div>
            <label className="consent">
              <input type="checkbox" defaultChecked /> I confirm the information provided is
              accurate.
            </label>
          </div>
        )}
        <div className="modal-actions">
          {step > 1 ? (
            <button className="btn secondary" onClick={() => setStep(step - 1)}>
              Back
            </button>
          ) : (
            <button className="btn ghost" onClick={close}>
              Cancel
            </button>
          )}
          <button
            className="btn primary"
            onClick={() => (step < 3 ? setStep(step + 1) : setSent(true))}
          >
            {step < 3 ? (
              <>
                Continue <ArrowRight size={17} />
              </>
            ) : (
              'Submit application'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function SideNav({
  active,
  setPage,
  role,
}: {
  active: string
  setPage: (p: Page) => void
  role: 'candidate' | 'employer' | 'admin'
}) {
  const items =
    role === 'admin'
      ? [
          [LayoutDashboard, 'Overview'],
          [ShieldCheck, 'Verifications'],
          [BriefcaseBusiness, 'Jobs'],
          [Star, 'Reviews'],
          [Flag, 'Reports'],
          [Users, 'Users'],
          [FileText, 'Audit log'],
        ]
      : role === 'employer'
        ? [
            [LayoutDashboard, 'Dashboard'],
            [BriefcaseBusiness, 'My jobs'],
            [Users, 'Applicants'],
            [MessageSquare, 'Messages'],
            [Building2, 'Company'],
          ]
        : [
            [LayoutDashboard, 'Dashboard'],
            [Search, 'Find jobs'],
            [FileCheck2, 'Applications'],
            [Heart, 'Saved jobs'],
            [MessageSquare, 'Messages'],
            [CircleUserRound, 'Profile'],
          ]
  return (
    <aside className={`side-nav ${role === 'admin' ? 'admin-nav' : ''}`}>
      <Logo />
      <small>{role.toUpperCase()} WORKSPACE</small>
      <nav>
        {items.map(([Icon, label]: any) => (
          <button
            className={active === label ? 'active' : ''}
            key={label}
            onClick={() => (label === 'Applicants' ? setPage('pipeline') : undefined)}
          >
            <Icon size={19} />
            {label}
            {label === 'Messages' && <i>3</i>}
          </button>
        ))}
      </nav>
      <div className="side-bottom">
        <button>
          <Settings /> Settings
        </button>
        <div className="user-row">
          <div className="avatar">AM</div>
          <span>
            <b>
              {role === 'admin'
                ? 'Maya Chen'
                : role === 'employer'
                  ? 'Jamie Rivera'
                  : 'Alex Morgan'}
            </b>
            <small>{role === 'admin' ? 'Trust & Safety Admin' : role}</small>
          </span>
          <MoreHorizontal />
        </div>
      </div>
    </aside>
  )
}

function WorkspaceHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle: string
  action?: React.ReactNode
}) {
  return (
    <div className="workspace-head">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="workspace-actions">
        <button className="icon-button">
          <Bell />
        </button>
        {action}
      </div>
    </div>
  )
}

function CandidateDashboard({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="workspace">
      <SideNav role="candidate" active="Dashboard" setPage={setPage} />
      <main className="workspace-main">
        <WorkspaceHeader
          title="Good morning, Alex"
          subtitle="Here’s what’s happening with your job search."
        />
        <section className="priority-banner">
          <div className="priority-icon">
            <Zap />
          </div>
          <div>
            <small>BEST NEXT ACTION</small>
            <b>Complete your verified typing test</b>
            <span>Unlock compatibility scores for 23 additional high-fit roles.</span>
          </div>
          <button className="btn primary">
            Start 2-minute test <ArrowRight size={16} />
          </button>
        </section>
        <div className="mobile-workspace-label">Candidate dashboard</div>
        <section className="dash-grid">
          <div className="metric-card primary-metric">
            <div>
              <small>PROFILE STRENGTH</small>
              <h2>92%</h2>
              <p>Add your typing score to stand out.</p>
              <button>
                Complete profile <ArrowRight size={15} />
              </button>
            </div>
            <div className="large-ring">92</div>
          </div>
          {[
            ['Active applications', '7', '+2 this week'],
            ['Saved jobs', '14', '3 closing soon'],
            ['Profile views', '38', '+18% this week'],
          ].map((m) => (
            <div className="metric-card" key={m[0]}>
              <small>{m[0]}</small>
              <h2>{m[1]}</h2>
              <p>{m[2]}</p>
            </div>
          ))}
        </section>
        <div className="dashboard-columns">
          <section className="panel">
            <div className="panel-head">
              <h2>Application activity</h2>
              <button className="text-button">View all</button>
            </div>
            {[
              ['Cloudstaff Pro', 'Customer Support Specialist', 'Under review', 'amber'],
              ['NexaCare Solutions', 'Claims Associate', 'Assessment', 'purple'],
              ['Vertex Global', 'Tech Support Advisor', 'Interview', 'teal'],
            ].map((x) => (
              <div className="application-row" key={x[1]}>
                <div className="company-logo small-logo">
                  {x[0]
                    .split(' ')
                    .map((y) => y[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <b>{x[1]}</b>
                  <span>{x[0]} · Updated today</span>
                </div>
                <Badge tone={x[3]}>{x[2]}</Badge>
                <ChevronRight />
              </div>
            ))}
          </section>
          <aside className="panel upcoming">
            <div className="panel-head">
              <h2>Next up</h2>
            </div>
            <div className="calendar-card">
              <span>
                JUN<b>18</b>
              </span>
              <div>
                <Badge tone="teal">Interview</Badge>
                <b>Cloudstaff Pro</b>
                <small>10:30 AM · Google Meet</small>
              </div>
            </div>
            <button className="btn secondary wide">Prepare for interview</button>
          </aside>
        </div>
        <section className="panel recommendations">
          <div className="panel-head">
            <div>
              <h2>Recommended for you</h2>
              <p>Based on your profile and preferences</p>
            </div>
            <button className="text-button" onClick={() => setPage('jobs')}>
              See all <ArrowRight size={15} />
            </button>
          </div>
          <div className="recommend-grid">
            {jobs.slice(0, 2).map((j) => (
              <JobCard key={j.title} job={j} onOpen={() => setPage('job')} />
            ))}
          </div>
        </section>
      </main>
      <MobileTabs />
    </div>
  )
}

function EmployerDashboard({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="workspace">
      <SideNav role="employer" active="Dashboard" setPage={setPage} />
      <main className="workspace-main">
        <WorkspaceHeader
          title="Employer dashboard"
          subtitle="Welcome back, Jamie. Here’s your hiring activity."
          action={
            <button className="btn primary">
              <BriefcaseBusiness size={18} /> Post a job
            </button>
          }
        />
        <section className="priority-banner employer-priority">
          <div className="priority-icon">
            <Users />
          </div>
          <div>
            <small>HIGH-INTENT CANDIDATES</small>
            <b>12 applicants are above a 90% role match</b>
            <span>Reviewing them today can reduce your estimated time-to-hire by 3 days.</span>
          </div>
          <button className="btn primary" onClick={() => setPage('pipeline')}>
            Review top matches <ArrowRight size={16} />
          </button>
        </section>
        <section className="dash-grid employer-metrics">
          {[
            ['Active jobs', '8', '+2 this month'],
            ['Total applicants', '246', '+34 this week'],
            ['Interviews', '18', '6 upcoming'],
            ['Time to hire', '12d', '↓ 3 days'],
          ].map((m, i) => (
            <div className="metric-card" key={m[0]}>
              <div className={`metric-icon m${i}`}>
                <BarChart3 />
              </div>
              <small>{m[0]}</small>
              <h2>{m[1]}</h2>
              <p>{m[2]}</p>
            </div>
          ))}
        </section>
        <div className="dashboard-columns employer-columns">
          <section className="panel">
            <div className="panel-head">
              <div>
                <h2>Hiring funnel</h2>
                <p>All active jobs · Last 30 days</p>
              </div>
              <button className="btn ghost small">View report</button>
            </div>
            <div className="funnel">
              {statuses.map((s, i) => (
                <div key={s[0]} style={{ width: `${100 - i * 12}%` }} className={s[2]}>
                  <span>{s[0]}</span>
                  <b>{s[1]}</b>
                </div>
              ))}
            </div>
          </section>
          <aside className="panel">
            <div className="panel-head">
              <h2>Needs attention</h2>
            </div>
            {[
              ['12', 'New applicants', 'Review candidates'],
              ['3', 'Interviews today', 'View schedule'],
              ['1', 'Job expiring soon', 'Extend listing'],
            ].map((x) => (
              <div className="attention-row" key={x[1]}>
                <b>{x[0]}</b>
                <span>
                  <strong>{x[1]}</strong>
                  <small>{x[2]}</small>
                </span>
                <ChevronRight />
              </div>
            ))}
          </aside>
        </div>
        <section className="panel job-table-panel">
          <div className="panel-head">
            <div>
              <h2>Active jobs</h2>
              <p>Manage roles and review applicant progress</p>
            </div>
            <button className="text-button">
              View all jobs <ArrowRight size={15} />
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Status</th>
                  <th>Applicants</th>
                  <th>In review</th>
                  <th>Published</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Customer Support Specialist', 'Published', '86', '14', 'Jun 10'],
                  ['Healthcare Claims Associate', 'Published', '54', '8', 'Jun 8'],
                  ['Technical Support Advisor', 'Paused', '38', '6', 'Jun 2'],
                ].map((x) => (
                  <tr key={x[0]}>
                    <td>
                      <b>{x[0]}</b>
                      <small>Remote · Full time</small>
                    </td>
                    <td>
                      <Badge tone={x[1] === 'Published' ? 'green' : 'slate'}>{x[1]}</Badge>
                    </td>
                    <td>
                      <b>{x[2]}</b>
                    </td>
                    <td>{x[3]}</td>
                    <td>{x[4]}</td>
                    <td>
                      <MoreHorizontal />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <MobileTabs employer />
    </div>
  )
}

function Pipeline({ setPage }: { setPage: (p: Page) => void }) {
  const columns = [
    [
      'Applied',
      'blue',
      [
        ['AM', 'Alex Morgan', '94%', '48 WPM'],
        ['PS', 'Priya Shah', '91%', '52 WPM'],
      ],
    ],
    [
      'Under review',
      'amber',
      [
        ['JL', 'Jordan Lee', '89%', '44 WPM'],
        ['MR', 'Mateo Reyes', '87%', '51 WPM'],
      ],
    ],
    ['Assessment', 'purple', [['SA', 'Samira Ali', '92%', '56 WPM']]],
    ['Interview', 'teal', [['CK', 'Chris Kim', '86%', '49 WPM']]],
    ['Offer', 'green', [['RB', 'Rina Bose', '96%', '61 WPM']]],
  ] as const
  return (
    <div className="workspace">
      <SideNav role="employer" active="Applicants" setPage={setPage} />
      <main className="workspace-main pipeline-main">
        <WorkspaceHeader
          title="Applicants pipeline"
          subtitle="Customer Support Specialist · 86 applicants"
          action={
            <button className="btn secondary">
              <SlidersHorizontal size={17} /> Filter
            </button>
          }
        />
        <div className="pipeline-tabs">
          {columns.map((c) => (
            <button key={c[0]}>
              {c[0]} <span>{c[2].length}</span>
            </button>
          ))}
        </div>
        <div className="kanban">
          {columns.map((c) => (
            <section className="kanban-column" key={c[0]}>
              <header>
                <span className={`dot ${c[1]}`} />
                {c[0]}
                <b>{c[2].length}</b>
                <MoreHorizontal />
              </header>
              {c[2].map((a) => (
                <article className="candidate-card" key={a[1]}>
                  <div className="candidate-top">
                    <div className="avatar">{a[0]}</div>
                    <div>
                      <b>{a[1]}</b>
                      <span>Customer support · 2y</span>
                    </div>
                    <MoreHorizontal />
                  </div>
                  <div className="candidate-scores">
                    <span>
                      <b>{a[2]}</b> match
                    </span>
                    <span>
                      <b>{a[3]}</b> typing
                    </span>
                  </div>
                  <div className="candidate-tags">
                    <Badge>English C1</Badge>
                    <Badge>Zendesk</Badge>
                  </div>
                  <footer>
                    <small>Applied 2h ago</small>
                    <button className="icon-button">
                      <ChevronRight />
                    </button>
                  </footer>
                </article>
              ))}
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

function AdminPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="workspace admin-workspace">
      <SideNav role="admin" active="Verifications" setPage={setPage} />
      <main className="workspace-main">
        <WorkspaceHeader
          title="Company verifications"
          subtitle="Review employer documents and protect the marketplace."
        />
        <section className="admin-summary">
          <div>
            <span className="metric-icon">
              <Clock3 />
            </span>
            <small>Pending review</small>
            <b>18</b>
          </div>
          <div>
            <span className="metric-icon green">
              <CheckCircle2 />
            </span>
            <small>Approved this week</small>
            <b>42</b>
          </div>
          <div>
            <span className="metric-icon red">
              <Flag />
            </span>
            <small>Flagged for review</small>
            <b>3</b>
          </div>
        </section>
        <section className="panel verification-panel">
          <div className="panel-head">
            <div className="tabs">
              <button className="active">
                Pending <span>18</span>
              </button>
              <button>
                Under review <span>7</span>
              </button>
              <button>Resolved</button>
            </div>
            <div className="table-tools">
              <div>
                <Search />
                <input placeholder="Search companies" />
              </div>
              <button className="btn secondary small">
                <Filter size={16} /> Filter
              </button>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Submitted</th>
                  <th>Documents</th>
                  <th>Risk signals</th>
                  <th>Reviewer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['BrightPath CX', 'Today, 9:42 AM', '4 of 4', 'None', 'Unassigned'],
                  ['CareAxis Global', 'Today, 8:15 AM', '4 of 4', 'Domain mismatch', 'M. Chen'],
                  [
                    'NovaLink Services',
                    'Yesterday',
                    '3 of 4',
                    'Missing registration',
                    'Unassigned',
                  ],
                  ['HaloDesk Co.', 'Yesterday', '4 of 4', 'None', 'R. Singh'],
                ].map((x, i) => (
                  <tr key={x[0]}>
                    <td>
                      <div className="company-cell">
                        <div className="company-logo small-logo">
                          {x[0]
                            .split(/\\s/)
                            .map((y) => y[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <span>
                          <b>{x[0]}</b>
                          <small>{i % 2 ? 'Philippines' : 'United Kingdom'} · BPO Services</small>
                        </span>
                      </div>
                    </td>
                    <td>{x[1]}</td>
                    <td>
                      <span className={x[2] === '4 of 4' ? 'success-text' : 'warning-text'}>
                        {x[2]}
                      </span>
                    </td>
                    <td>
                      {x[3] === 'None' ? (
                        <Badge tone="green">No signals</Badge>
                      ) : (
                        <Badge tone="amber">
                          <Flag size={11} /> {x[3]}
                        </Badge>
                      )}
                    </td>
                    <td>{x[4]}</td>
                    <td>
                      <button className="btn secondary small">
                        Review <ChevronRight size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <div className="annotation">
          <HelpCircle />
          <span>
            <b>Trust & safety checkpoint</b>Approval records the reviewer, timestamp, and evidence
            in the immutable audit log.
          </span>
        </div>
      </main>
    </div>
  )
}

function UIKit() {
  return (
    <main className="kit-page">
      <div className="kit-intro">
        <Badge tone="remote">DESIGN SYSTEM · v1.1</Badge>
        <h1>RemoteBPO Hub UI Kit</h1>
        <p>A practical, accessible component foundation for a trust-first hiring marketplace.</p>
      </div>
      <section className="kit-section">
        <h2>Color system</h2>
        <div className="swatches">
          {[
            ['Lime action', '#A3E635'],
            ['Deep ink', '#122327'],
            ['Action ink', '#152925'],
            ['Muted text', '#5A6E66'],
            ['Cool sage', '#9BB0B5'],
            ['Pale sage', '#E4EEE3'],
            ['Soft surface', '#F1F5F2'],
            ['Canvas', '#F3F7F4'],
          ].map((x) => (
            <div className="swatch" key={x[0]}>
              <span style={{ background: x[1] }} />
              <b>{x[0]}</b>
              <small>{x[1]}</small>
            </div>
          ))}
        </div>
      </section>
      <section className="kit-section kit-grid">
        <div>
          <h2>Typography</h2>
          <div className="type-samples">
            <h1>Heading one</h1>
            <h2>Heading two</h2>
            <h3>Heading three</h3>
            <p>Body text is optimized for clear reading across devices.</p>
            <small>Caption and supporting information</small>
          </div>
        </div>
        <div>
          <h2>Buttons</h2>
          <div className="component-stack">
            <button className="btn primary">Primary action</button>
            <button className="btn secondary">Secondary action</button>
            <button className="btn ghost">Ghost action</button>
            <button className="btn destructive">
              <Flag size={17} /> Report
            </button>
            <button className="btn primary" disabled>
              Disabled
            </button>
          </div>
        </div>
      </section>
      <section className="kit-section kit-grid">
        <div>
          <h2>Fields & controls</h2>
          <div className="component-stack wide-components">
            <label className="field">
              <span>Email address</span>
              <input placeholder="name@example.com" />
            </label>
            <label className="field error-field">
              <span>Password</span>
              <input value="short" readOnly />
              <small>Use at least 10 characters.</small>
            </label>
            <label className="field">
              <span>Process type</span>
              <select>
                <option>Customer service</option>
              </select>
            </label>
            <label className="toggle-row">
              <button className="toggle on">
                <span />
              </button>
              <span>
                <b>Email job alerts</b>
                <small>Recommended matches once a day</small>
              </span>
            </label>
          </div>
        </div>
        <div>
          <h2>Badges & states</h2>
          <div className="badge-showcase">
            <Badge tone="verified">
              <ShieldCheck size={12} /> Verified
            </Badge>
            <Badge tone="amber">
              <Star size={12} /> Featured
            </Badge>
            <Badge tone="remote">
              <Wifi size={12} /> Remote
            </Badge>
            <Badge tone="blue">Voice</Badge>
            <Badge>Non-Voice</Badge>
            {statuses.map((s) => (
              <Badge key={s[0]} tone={s[2]}>
                {s[0]}
              </Badge>
            ))}
            <Badge tone="red">Rejected</Badge>
          </div>
          <div className="alert good">
            <CheckCircle2 />
            <span>
              <b>Changes saved</b>
              <small>Your profile was updated successfully.</small>
            </span>
          </div>
          <div className="alert error-alert">
            <Flag />
            <span>
              <b>Something went wrong</b>
              <small>Check your connection and try again.</small>
            </span>
          </div>
        </div>
      </section>
      <section className="kit-section">
        <h2>Loading, empty & recovery states</h2>
        <div className="state-grid">
          <div className="state-card">
            <div className="skeleton circle" />
            <div>
              <div className="skeleton" />
              <div className="skeleton short" />
            </div>
            <div className="skeleton block" />
          </div>
          <div className="state-card empty">
            <Search />
            <b>No jobs match these filters</b>
            <p>Try removing a filter or broadening your search.</p>
            <button className="btn secondary small">Clear filters</button>
          </div>
          <div className="state-card empty">
            <Wifi />
            <b>You’re offline</b>
            <p>We’ll reconnect and save your progress automatically.</p>
            <button className="btn secondary small">Try again</button>
          </div>
        </div>
      </section>
    </main>
  )
}

function MobileTabs({ employer = false }: { employer?: boolean }) {
  return (
    <nav className="mobile-tabs">
      {(employer
        ? [
            [Home, 'Home'],
            [BriefcaseBusiness, 'Jobs'],
            [Users, 'Applicants'],
            [MessageSquare, 'Messages'],
            [Building2, 'Company'],
          ]
        : [
            [Home, 'Home'],
            [Search, 'Jobs'],
            [FileCheck2, 'Applications'],
            [MessageSquare, 'Messages'],
            [CircleUserRound, 'Profile'],
          ]
      ).map(([Icon, label]: any, i) => (
        <button className={i === 0 ? 'active' : ''} key={label}>
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <Logo />
          <p>Verified remote BPO opportunities for a global workforce.</p>
        </div>
        <div>
          <b>For candidates</b>
          <a>Find jobs</a>
          <a>Companies</a>
          <a>Safety tips</a>
        </div>
        <div>
          <b>For employers</b>
          <a>Post a job</a>
          <a>Verification</a>
          <a>Pricing</a>
        </div>
        <div>
          <b>Support</b>
          <a>Contact us</a>
          <a>Report a scam</a>
          <a>Privacy notice</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 RemoteBPO Hub</span>
        <span>Terms · Privacy · Accessibility</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const workspacePage = ['candidate', 'employer', 'pipeline', 'admin'].includes(page)
  const navigate = (next: Page) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div>
      {!workspacePage && <Header page={page} setPage={navigate} />}
      {page === 'home' && <HomePage setPage={navigate} />}
      {page === 'jobs' && <JobsPage setPage={navigate} />}
      {page === 'job' && <JobDetail setPage={navigate} />}
      {page === 'candidate' && <CandidateDashboard setPage={navigate} />}
      {page === 'employer' && <EmployerDashboard setPage={navigate} />}
      {page === 'pipeline' && <Pipeline setPage={navigate} />}
      {page === 'admin' && <AdminPage setPage={navigate} />}
      {page === 'kit' && <UIKit />}
      <div className="prototype-switcher">
        <span>Prototype views</span>
        <button className={page === 'home' ? 'active' : ''} onClick={() => navigate('home')}>
          Public
        </button>
        <button
          className={page === 'candidate' ? 'active' : ''}
          onClick={() => navigate('candidate')}
        >
          Candidate
        </button>
        <button
          className={page === 'employer' || page === 'pipeline' ? 'active' : ''}
          onClick={() => navigate('employer')}
        >
          Employer
        </button>
        <button className={page === 'admin' ? 'active' : ''} onClick={() => navigate('admin')}>
          Admin
        </button>
        <button className={page === 'kit' ? 'active' : ''} onClick={() => navigate('kit')}>
          UI kit
        </button>
      </div>
    </div>
  )
}
