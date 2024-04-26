import dynamic from 'next/dynamic'

const ArticleSection = dynamic(() => import('./ArticleSection'))

export default ArticleSection
