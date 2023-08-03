import LivePreviewUtils from '@contentstack/live-preview-utils'

export default function initialize() {
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

  if (process.env.NODE_ENV !== 'production') {
    console.log('Contentstack Live Preview: Initialization Started')

    promise?.then(() => console.log('Contentstack Live Preview: Initialization Succeeded'))

    promise?.catch((error) => console.log(error, 'Contentstack Live Preview: Initialization Failed'))
  }
}
