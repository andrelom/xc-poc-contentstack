import dynamic from 'next/dynamic'

const Contentstack = {
  Link: dynamic(() => import('./Link')),
  LivePreview: dynamic(() => import('./LivePreview')),
}

export default Contentstack
