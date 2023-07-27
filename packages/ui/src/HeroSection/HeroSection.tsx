import type { ModularBlock } from '@xc/ui/ModularBlocks'

import Link from '@xc/ui/Link'

import css from './HeroSection.module.css'

export default function HeroSection({ data }: ModularBlock<Contentstack.Globals.HeroSection>) {
  if (!data) return null

  return (
    <div className={css.Wrapper}>
      <div className={css.Body}>
        <h1 className={css.Title}>{data.title}</h1>
        <p className={css.Dscription}>{data.description}</p>
        <div className={css.Links}>
          <Link className={css.PrimaryLink} data={data.primary_link} />
          <Link className={css.SecondaryLink} data={data.secondary_link} />
        </div>
      </div>
    </div>
  )
}
