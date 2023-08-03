import LivePreviewUtils from '@contentstack/live-preview-utils'

export default function initialize() {
  const enabled = process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === 'true'

  if (!enabled) return

  const promise = LivePreviewUtils.init({
    ssr: true,
    enable: true,
    clientUrlParams: {
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_API_HOST,
    },
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
    },
  })

  console.info('Contentstack Live Preview: Initialization Started')

  promise?.then(() => console.info('Contentstack Live Preview: Initialization Succeeded'))

  promise?.catch((error) => console.error(error, 'Contentstack Live Preview: Initialization Failed'))
}
