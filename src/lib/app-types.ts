export type Role = 'candidate' | 'employer' | 'admin'

export type Profile = {
  id: string
  email: string
  role: Role
  displayName: string
  companyName?: string
  headline?: string
  location?: string
  bio?: string
  tools?: string[]
  languages?: Array<{ code: string; proficiency: string }>
  availability?: string[]
  verified?: boolean
}

export type Job = {
  id: string
  slug: string
  employerId: string
  companyName: string
  companyVerified: boolean
  title: string
  process: string
  mode: string
  location: string
  shift: string
  salary: string
  language: string
  tools: string[]
  description: string
  status: 'draft' | 'published'
  createdAt: string
}

export type Application = {
  id: string
  candidateId: string
  candidateName: string
  employerId: string
  jobId: string
  jobTitle: string
  companyName: string
  coverNote: string
  status: string
  createdAt: string
  updatedAt: string
}
