import mongoose from 'mongoose'
import config from './config'
import { logger, errorlogger } from './shared/logger'
import app from './app'
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connection successfull`)

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error(`Database Error: ${error}`)
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
bootstrap()
