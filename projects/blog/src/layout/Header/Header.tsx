import type { RootLayoutData } from '@xc/shared/data/blog/getRootLayout'

import Image from 'next/image'

export default function Header({ data }: { data: RootLayoutData | null | undefined }) {
  if (!data) return null

  return (
    <div>
      <div>
        <Image src={data.group_header.file_logo.url} alt={data.group_header.file_logo.title} width={180} height={40} />
      </div>
      <div></div>
      <div></div>
    </div>
  )
}
