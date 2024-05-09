import type { Logger } from './types'

const cli = typeof window !== 'undefined'
const dev = process.env.NODE_ENV !== 'production'

const client: Logger = {
  info: (message: string) => cli && dev && console.info(message),
  warn: (message: string) => cli && dev && console.warn(message),
  error: (data: any, message?: string) => cli && dev && console.error(JSON.stringify(data), message),
}

export default client
