import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import { tags } from '@xc/ui/Contentstack'
import Contentstack from '@xc/ui/Contentstack'
import getArticlePage from '@xc/shared/data/blog/getArticlePage'
export { dynamic, revalidate } from '@/ssr'
import ArticleSection from '@xc/ui/Article'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getArticlePage({ path: `/resources/${params.path}` })
})

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getArticlePage({ path: `/resources/${params.path}`, preview: searchParams })

  console.log('article---------------', result)
  if (!result.ok || !result.data) {
    return notFound()
  }


  return (
    <>
      <div className='marketing-pages-lightning'>
        <Contentstack.ModularBlocks
          entries={result.data.page_components}
          components={{
            article: ArticleSection,
          }}
        />
      </div>
    </>
  )
}
