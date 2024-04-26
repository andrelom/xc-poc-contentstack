import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getHomePage from '@xc/shared/data/blog/getHomePage'

export { dynamic, revalidate } from '@/ssr'

export const generateMetadata = createMetadataGenerator(() => {
  return getHomePage({})
})

export default async function Page({ searchParams }: Core.Page) {
  const result = await getHomePage({ preview: searchParams })

  if (!result.ok || !result.data) {
    return notFound()
  }

  return (
    <>
      <div>{result.data?.title}</div>
    </>
  )
}
