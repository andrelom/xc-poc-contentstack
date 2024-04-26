import type { ModularBlock } from '@xc/ui/Contentstack'

import { tags } from '@xc/ui/Contentstack'


export default function TeamSection({ data }: ModularBlock<Contentstack.Globals.TeamSection>) {
  if (!data) return null

  return (
    <div>
        <h1 {...tags(data, 'title')}>
          {data.title}
        </h1>
        <ul>
          {
          data.team_members?.map((member) => (
            <li>
              <h2>{member.title}</h2>
              <img src={member.image?.url} alt={member.image?.title} />
              <div dangerouslySetInnerHTML={{ __html: member.description }}/>
            </li>
            ))
          }
        </ul>
    </div>
  )
}
