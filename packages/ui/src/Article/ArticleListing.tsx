import type { ModularBlock } from '@xc/ui/Contentstack'
import style from './articlelisting.module.css'
import { tags } from '@xc/ui/Contentstack'


export default function ArticleListing({ data }: ModularBlock<Contentstack.Globals.ArticleListing>) {
  if (!data) return null

  console.log(data,'article listing.............')
  return (
    <section className='marketing-page'>
      <div className='marketing-pages-lightning'>
        <h2 className="category">{data.title}</h2>
        <div className="flex summary two-wide">
        {
            data.articles?.map((article) => (  
          <div className="card summary">
            <div className="card-image">
              <a href={article.url}>
                <img className="img-responsive" src={article.article_image?.url} alt={article.article_image?.title}/> </a>
              </div>
              <h3 className="summary">
                <a href={article.url}>{article.article_title}</a>
              </h3>
              <div className='summary'>
                {article.article_summary}
              </div>
              {/* <p className="summary">FleetPride discusses the steps involved in the compressor replacement process, including the importance of flushing non-replaced components. Visit FleetPride.com to find reliable A/C compressor for your heavy duty needs.</p> */}
              <a className="summary" href={article.url}>View Article</a>
            </div>
            ))
        }
        </div>
      </div>
		</section>
  )
}
