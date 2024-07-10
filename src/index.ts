import * as dotenv from 'dotenv'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata'

import applicationStarter from './api/applicationStarter'
import Logger from './infrastructure/log/logger'

dotenv.config()

const appName = process.env.APP_NAME ?? process.argv.slice(2)[0];

(async (): Promise<void> => {
  Logger.info(`Initializing application "${appName}"`)

  await applicationStarter(appName)
})().catch((err) => {
  Logger.error(`FATAL ERROR: ${err}`)
})
