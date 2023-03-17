import * as dotenv from 'dotenv';
import 'reflect-metadata';
import ApplicationFactory from './api/applicationFactory';
import setupAws from './api/setupAws';
import Logger from './infrastructure/log/logger';

dotenv.config();
setupAws();

const appName = process.env.APP_NAME || '';

(async (): Promise<void> => {
  Logger.info(`Initializing app ${appName}`);
  const app = ApplicationFactory.create(appName, false);

  app.start();
})().catch(err => {
  Logger.error(`FATAL ERROR: ${err}`);
});
