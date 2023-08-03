import pino from 'pino'

// Pino is a structured logging package.
// See more at: https://getpino.io/#/docs/api
const raw = pino({
  name: 'XCentium',
  level: process.env.LOGGING_LEVEL ?? 'info',
})

const server = {
  info: (message: string) => raw.info(message),
  warn: (message: string) => raw.warn(message),
  error: (data: any, message?: string) => raw.error(data, message),
}

export default server
