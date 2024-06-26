import * as dotenv from 'dotenv'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata'

import ApplicationFactory from './api/applicationFactory'
import Logger from './infrastructure/log/logger'

dotenv.config()

const appName = process.env.APP_NAME ?? process.argv.slice(2)[0];

(async (): Promise<void> => {
  Logger.info(`Initializing app "${appName}"`)
  const app = ApplicationFactory.create(appName)

  app.start()
})().catch((err) => {
  Logger.error(`FATAL ERROR: ${err}`)
})
