import { WorkspaceProvider } from '@/components/workspace/workspace-provider'

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceProvider role="candidate">{children}</WorkspaceProvider>
}
