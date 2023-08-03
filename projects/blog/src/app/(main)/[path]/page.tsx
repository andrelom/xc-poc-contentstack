import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getGenericPage from '@xc/shared/data/blog/getGenericPage'

import Contentstack from '@xc/ui/Contentstack'
import HeroSection from '@xc/ui/HeroSection'

export { dynamic, revalidate } from '@/settings'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getGenericPage({ path: `/${params.path}` })
})

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getGenericPage({ path: `/${params.path}`, preview: searchParams })

  if (!result.ok || !result.data) {
    return notFound()
  }

  const data = {
    title: result.data.title,
    modular_blocks_main: result.data.modular_blocks_main,
  }

  return (
    <>
      <Contentstack.ModularBlocks
        entries={data.modular_blocks_main}
        components={{
          hero_section: HeroSection,
        }}
      />
    </>
  )
}
