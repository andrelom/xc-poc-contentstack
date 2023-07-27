import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getPostsPage from '@xc/shared/data/blog/getPostsPage'
import settings from '@/settings'

export const revalidate = settings.revalidate

export const dynamic = 'force-static'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getPostsPage()
})

export default async function Page({}: Core.Page<{ path: string }>) {
  const result = await getPostsPage()

  if (!result.ok || !result.data) {
    return notFound()
  }

  const data = {
    title: result.data.title,
  }

  return (
    <>
      <h1>{data.title}</h1>
    </>
  )
}
