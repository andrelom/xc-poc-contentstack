import type { ModularBlock } from '@xc/ui/Contentstack'

import { tags } from '@xc/ui/Contentstack'


export default function ArticleSection({ data }: ModularBlock<Contentstack.Globals.ArticleSection>) {
  if (!data) return null

  console.log(data,'article listing.............')
  return (
    <section>
      listing

    </section>
  )
}
