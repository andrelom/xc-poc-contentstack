import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import { tags } from '@xc/ui/Contentstack'
import getPage from '@xc/shared/data/blog/getPage'
export { dynamic, revalidate } from '@/ssr'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getPage({ path: `/parts/${params.path}` })
})

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getPage({ path: `/parts/${params.path}`, preview: searchParams })

  if (!result.ok || !result.data) {
    return notFound()
  }


  return (
    <>
      <div {...tags(result.data, 'title')}>
        {result.data.title}
      </div>
    </>
  )
}
