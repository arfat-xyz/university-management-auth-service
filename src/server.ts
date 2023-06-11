import mongoose from 'mongoose'
import config from './config'
import app from './app'
import { Logger } from './Shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  Logger.errorLogger.error(error)
  process.exit(1)
})

let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    Logger.logger.info(`Database connection successfull`)

    server = app.listen(config.port, () => {
      Logger.logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    Logger.errorLogger.error(`Database Error: ${error}`)
  }

  process.on('unhandledRejection', error => {
    console.log("Unhandled error found. We're closing our server")
    if (server) {
      server.close(() => {
        Logger.errorLogger.error(error)
      })
    } else {
      process.exit(1)
    }
  })
}
bootstrap()

process.on('SIGTERM', () => {
  if (server) {
    server.close()
  }
})
