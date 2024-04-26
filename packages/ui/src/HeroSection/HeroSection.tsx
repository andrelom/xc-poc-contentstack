import type { ModularBlock } from '@xc/ui/Contentstack'

import Contentstack, { tags } from '@xc/ui/Contentstack'

import css from './HeroSection.module.css'

export default function HeroSection({ data }: ModularBlock<Contentstack.Globals.HeroSection>) {
  if (!data) return null

  return (
    <div className={css.Wrapper} style={{ backgroundColor: `${data.background_color}`}}>
      <div className={css.Body}>
        <h1 className={css.Title} {...tags(data, 'title')}>
          {data.title}
        </h1>
        <div className={css.Dscription} {...tags(data, 'description')} dangerouslySetInnerHTML={{__html: data.description}}/>
      
        <div className={css.Links}>
          <Contentstack.Link className={css.PrimaryLink} data={data.primary_link} />
          <Contentstack.Link className={css.SecondaryLink} data={data.secondary_link} />
        </div>
      </div>
    </div>
  )
}
