import type { RootLayoutData } from '@xc/shared/data/blog/getRootLayout'

import Image from 'next/image'

import css from './Header.module.css'

export default function Header({ data }: { data: RootLayoutData | null | undefined }) {
  if (!data) return null

  return (
    <header className={css.Wrapper}>
      <div className={css.Container}>
        <div className={css.Left}>
          <Image
            src={data.group_header.file_logo.url}
            alt={data.group_header.file_logo.title}
            width={180}
            height={40}
          />
        </div>
        <div className={css.Center}></div>
        <div className={css.Right}></div>
      </div>
    </header>
  )
}
