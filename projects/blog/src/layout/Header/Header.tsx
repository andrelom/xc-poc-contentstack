import type { RootLayoutData } from '@xc/shared/data/blog/getRootLayout'

import Image from 'next/image'
import Link from '@xc/ui/Link/Link'

import css from './Header.module.css'

export default function Header({ data }: { data: RootLayoutData | null | undefined }) {
  if (!data) return null

  return (
    <div className={css.Wrapper}>
      <div className={css.Container}>
        <div className={css.Left}>
          <Image src={data.image_header_logo.url} alt={data.image_header_logo.title} width={180} height={40} />
        </div>
        <div className={css.Center}>
          <div className={css.Navigation}>
            {data.mb_header_navigation.map(({ item }) => (
              <Link data={item.link} />
            ))}
          </div>
        </div>
        <div className={css.Right}></div>
      </div>
    </div>
  )
}
