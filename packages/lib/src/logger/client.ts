const dev = process.env.NODE_ENV !== 'production'

const client = {
  info(message: string) {
    if (dev) {
      console.info(message)
    }
  },

  warn(message: string) {
    if (dev) {
      console.warn(message)
    }
  },

  error(data: any, message: string) {
    if (dev) {
      console.error(message, data)
    }
  },
}

export default client
