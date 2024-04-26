import type { ModularBlock } from '@xc/ui/Contentstack'

import { tags } from '@xc/ui/Contentstack'


export default function TeamSection({ data }: ModularBlock<Contentstack.Globals.HeroSection>) {
  console.log('tttttttttttt', data);
  if (!data) return null

  return (
    <div>
        1
        <h1 {...tags(data, 'title')}>
          {data.title}
        </h1>
    </div>
  )
}
