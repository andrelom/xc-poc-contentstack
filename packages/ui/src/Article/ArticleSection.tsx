import type { ModularBlock } from '@xc/ui/Contentstack'

import { tags } from '@xc/ui/Contentstack'
import { ArticlePageData } from '@xc/shared/src/data/blog/getArticlePage'

type ArticleProp = {
  data: ArticlePageData
}
export default function ArticleSection({ data } : ArticleProp) {
  if (!data) return null

  return (
    <section>
        <h1 {...tags(data, 'article_title')}>
          {data.article_title}
        </h1>
        <p className="written-date" {...tags(data, 'article_date')}>Revised {data.article_date}</p>
        <div {...tags(data, 'article_body')} dangerouslySetInnerHTML={{ __html: data?.article_body }} />
        <div className="footnote" dangerouslySetInnerHTML={{__html:data?.disclaimer[0]?.disclaimer_text}}/>
    </section>
  )
}
