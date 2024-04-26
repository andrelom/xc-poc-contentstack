import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import { tags } from '@xc/ui/Contentstack'
import getContentPage from '@xc/shared/data/blog/getContentPage'

export { dynamic, revalidate } from '@/ssr'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getContentPage({ path: `/content/${params.path}` })
})

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getContentPage({ path: params.path, preview: searchParams })

  if (!result.ok || !result.data) {
    return notFound()
  }


  return (
    <>
      <div {...tags(result.data, 'body')} dangerouslySetInnerHTML={{ __html: result.data.body }} ></div>;
    </>
  )
}
