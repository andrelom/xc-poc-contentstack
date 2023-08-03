import { notFound } from 'next/navigation'
import { serialize } from 'next-mdx-remote/serialize'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getPostPage from '@xc/shared/data/blog/getPostPage'

import Client from './Client'

export { dynamic, revalidate } from '@/settings'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getPostPage({ path: `/posts/${params.path}` })
})

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getPostPage({ path: `/posts/${params.path}`, query: searchParams })

  if (!result.ok || !result.data) {
    return notFound()
  }

  const data = {
    title: result.data.title,
    description: result.data.description,
    mdx: await serialize(result.data.body),
  }

  return <Client data={data} />
}
