import Contentstack from '@xc/lib/Contentstack'

export const blog = new Contentstack({
  key: process.env.CONTENTSTACK_API_KEY,
  token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  region: process.env.CONTENTSTACK_REGION,
  branch: process.env.CONTENTSTACK_BRANCH,
  preview: {
    enable: process.env.CONTENTSTACK_LIVE_PREVIEW === 'true',
    host: process.env.CONTENTSTACK_API_HOST,
    token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
  },
})
