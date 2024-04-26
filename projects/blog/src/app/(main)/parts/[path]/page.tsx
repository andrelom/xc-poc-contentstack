import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import Contentstack from '@xc/ui/Contentstack'
import getPage from '@xc/shared/data/blog/getPage'
import TeamSection from '@xc/ui/Team'
export { dynamic, revalidate } from '@/ssr'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getPage({ path: `/parts/${params.path}` })
})

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getPage({ path: `/parts/${params.path}`, preview: searchParams })

  console.log('mmmmmmmmmm', result.data)
  if (!result.ok || !result.data) {
    return notFound()
  }


  return (
    <>
      <Contentstack.ModularBlocks
        entries={result.data.components}
        components={{
          team: TeamSection,
        }}
      />
    </>
  )
}
