import { notFound } from 'next/navigation'
import { serialize } from 'next-mdx-remote/serialize'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getPostPage from '@xc/shared/data/blog/getPostPage'
import settings from '@/settings'

import Client from './Client'

export const revalidate = settings.revalidate

export const dynamic = 'force-static'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getPostPage({ path: `/post/${params.path}` })
})

export default async function Page({ params }: Core.Page<{ path: string }>) {
  const result = await getPostPage({ path: `/post/${params.path}` })

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
