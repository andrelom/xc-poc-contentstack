'use client'

import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { MDXRemote } from 'next-mdx-remote'

export default function Client({
  data,
}: {
  data: {
    title: string
    description: string
    mdx: MDXRemoteSerializeResult
  }
}) {
  return (
    <>
      <div className="mx-auto mt-8 max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.title}</h1>
        <p className="mb-8">{data.description}</p>
        <div className="prose max-w-full border-t border-t-gray-300 pt-6">
          <MDXRemote {...data.mdx} />
        </div>
      </div>
    </>
  )
}
