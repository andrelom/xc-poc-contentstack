import dynamic from 'next/dynamic'

export type { ModularBlock } from './ModularBlocks'

const Contentstack = {
  Link: dynamic(() => import('./Link')),
  ModularBlocks: dynamic(() => import('./ModularBlocks')),
}

export default Contentstack
