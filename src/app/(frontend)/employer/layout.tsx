import { WorkspaceProvider } from '@/components/workspace/workspace-provider'

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceProvider role="employer">{children}</WorkspaceProvider>
}
