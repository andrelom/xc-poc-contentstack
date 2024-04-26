import type { ModularBlock } from '@xc/ui/Contentstack'

import { tags } from '@xc/ui/Contentstack'


export default function TeamSection({ data }: ModularBlock<Contentstack.Globals.TeamSection>) {
  if (!data) return null

  return (
    <div className='marketing-page'>
        <h1 className='dxp-text-heading-xlarge' {...tags(data, 'title')}>
          {data.title}
        </h1>
        <hr/>
          {
          data.team_members?.map((member) => (              
              <div className="slds-grid slds-gutters slds-wrap">
                <div className="slds-col slds-size_2-of-12 slds-var-m-bottom_large">
                  <img src={member.image?.url} alt={member.image?.title}/>
                </div>
                <div className="slds-col slds-size_10-of-12 slds-var-m-bottom_large">
                  <h2 className="dxp-text-heading-large">{member.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: member.description }}/>
                </div>
              </div>
            ))
          }
        
    </div>
  )
}
