import { Footer } from '@/components/layout/footer'
import { PublicHeader } from '@/components/layout/public-header'
import { JobDetail } from '@/components/marketplace/job-detail'

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <>
      <PublicHeader />
      <JobDetail slug={slug} />
      <Footer />
    </>
  )
}
