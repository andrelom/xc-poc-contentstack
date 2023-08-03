const isLivePreviewEnabled = process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === 'true'

export const dynamic = isLivePreviewEnabled ? 'force-dynamic' : 'force-static'

export const revalidate = isLivePreviewEnabled ? false : parseInt(process.env.NEXT_REVALIDATE) || Infinity
