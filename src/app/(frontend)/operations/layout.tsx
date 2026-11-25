import { WorkspaceProvider } from '@/components/workspace/workspace-provider'

export default function OperationsLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceProvider role="admin">{children}</WorkspaceProvider>
}
