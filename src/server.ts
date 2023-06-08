import mongoose from 'mongoose'
import config from './config'
import app from './app'
import errorHandler from './Shared/logger'
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    errorHandler.logger.info(`Database connection successfull`)

    app.listen(config.port, () => {
      errorHandler.logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorHandler.errorLogger.error(`Database Error: ${error}`)
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
bootstrap()
