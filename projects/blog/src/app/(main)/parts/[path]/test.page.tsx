import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getPage from '@xc/shared/data/blog/getPage'
import { tags } from '@xc/ui/Contentstack'

export { dynamic, revalidate } from '@/ssr'

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getPage({ path: `/parts/${params.path}`, preview: searchParams })

  if (!result.ok || !result.data) {
    return notFound()
  }

  const data = result.data as any
  const component = result.data.components[0] as any

  return (
    <>
      <div>
        <h1 {...(data?.$?.title ?? {})}>This will NOT crash: {data?.title}</h1>
        <h1 {...(component?.$?.title ?? {})}>This will crash: {component?.title}</h1>
      </div>
    </>
  )
}
