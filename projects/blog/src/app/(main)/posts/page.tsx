import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getPostsPage from '@xc/shared/data/blog/getPostsPage'
import settings from '@/settings'

export const revalidate = settings.revalidate

export const dynamic = 'force-static'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getPostsPage()
})

export default async function Page({}: Core.Page<{ path: string }>) {
  const result = await getPostsPage()

  if (!result.ok || !result.data) {
    return notFound()
  }

  const data = {
    title: result.data.title,
    subtitle: result.data.subtitle,
    description: result.data.description,
  }

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{data.title}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.title}</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">{data.description}</p>
          </div>
        </div>
      </div>
    </>
  )
}
