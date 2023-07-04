import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { Server } from 'http';
import { Logger } from './Shared/logger';

process.on('uncaughtException', error => {
  // console.log(error);
  Logger.errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    // console.log(`Database connection successfull`);
    Logger.logger.info(`Database connection successfull`);

    server = app.listen(config.port, () => {
      Logger.logger.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    Logger.logger.info(`Database Error: ${error}`);
  }

  process.on('unhandledRejection', error => {
    // console.log("Unhandled error found. We're closing our server");
    Logger.errorLogger.error("Unhandled error found. We're closing our server");
    if (server) {
      server.close(() => {
        console.log(error);
        Logger.errorLogger.error(error);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on('SIGTERM', () => {
  if (server) {
    server.close();
  }
});
