import type { ModularBlock } from '@xc/ui/Contentstack'

import { tags } from '@xc/ui/Contentstack'
import { ArticlePageData } from '@xc/shared/src/data/blog/getArticlePage'

type ArticleProp = {
  data: ArticlePageData
}
export default function ArticleSection({ data } : ArticleProp) {
  console.log('article_section........', data)
  if (!data) return null

  console.log(data,'article')
  return (
    <section>
        <h1 {...tags(data, 'article_title')}>
          {data.article_title}
        </h1>
        <p className="written-date" {...tags(data, 'article_date')}>Revised{data.article_date}</p>
        <div {...tags(data, 'article_body')} dangerouslySetInnerHTML={{ __html: data?.article_body }} />
    </section>
  )
}
