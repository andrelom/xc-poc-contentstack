import dynamic from 'next/dynamic'

const Contentstack = {
  Link: dynamic(() => import('./Link')),
}

export default Contentstack
