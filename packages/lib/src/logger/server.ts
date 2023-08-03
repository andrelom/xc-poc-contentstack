import pino from 'pino'

// Pino is a structured logging package.
// See more at: https://getpino.io/#/docs/api
const server = pino({
  name: 'XCentium',
  level: process.env.LOGGING_LEVEL ?? 'info',
})

export default server
