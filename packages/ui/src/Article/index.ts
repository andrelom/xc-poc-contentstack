import dynamic from 'next/dynamic'

export const ArticleSection = dynamic(() => import('./ArticleSection'))
export const ArticleListing = dynamic(() => import('./ArticleListing'))
