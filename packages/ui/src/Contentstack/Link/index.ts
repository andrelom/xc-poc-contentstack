import dynamic from 'next/dynamic'

const Link = dynamic(() => import('./Link'))

export default Link
