import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getPage from '@xc/shared/data/blog/getPage'

import Contentstack from '@xc/ui/Contentstack'
import HeroSection from '@xc/ui/HeroSection'
import TeamSection from '@xc/ui/Team'
import ArticleListing from '@xc/ui/Article/ArticleListing'

export { dynamic, revalidate } from '@/ssr'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getPage({ path: `/${params.path}` })
})

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getPage({ path: `/${params.path}`, preview: searchParams })

  
  if (!result.ok || !result.data) {
    return notFound()
  }

  const entries = result.data.components.reduce((records, component) => {
    return [...records, { [component._content_type_uid]: { ...component } }]
  }, [] as any) as Array<Record<string, unknown>>

  return (
    <>
      <Contentstack.ModularBlocks
        entries={entries}
        components={{
          hero_section: HeroSection,
          team: TeamSection,
          article_listing: ArticleListing
        }}
      />
    </>
  )
}
