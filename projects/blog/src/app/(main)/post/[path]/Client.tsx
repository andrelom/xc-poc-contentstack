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
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <div className="prose">
        <MDXRemote {...data.mdx} />
      </div>
    </>
  )
}
