const dev = process.env.NODE_ENV !== 'production'

const client = {
  info: (message: string) => dev && console.info(message),
  warn: (message: string) => dev && console.warn(message),
  error: (obj: any, message: string) => dev && console.error(message, obj),
}

export default client
