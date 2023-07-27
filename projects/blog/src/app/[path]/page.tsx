import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getGenericPage from '@xc/shared/data/blog/getGenericPage'
import settings from '@/settings'

import ModularBlocks from '@xc/ui/ModularBlocks'
import HeroSection from '@xc/ui/HeroSection'

export const revalidate = settings.revalidate

export const dynamic = 'force-static'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getGenericPage({ path: `/${params.path}` })
})

export default async function Page({ params }: Core.Page<{ path: string }>) {
  const result = await getGenericPage({ path: `/${params.path}` })

  if (!result.ok || !result.data) {
    return notFound()
  }

  const data = {
    title: result.data.title,
    modular_blocks_main: result.data.modular_blocks_main,
  }

  return (
    <>
      <ModularBlocks
        entries={data.modular_blocks_main}
        components={{
          hero_section: HeroSection,
        }}
      />
    </>
  )
}
