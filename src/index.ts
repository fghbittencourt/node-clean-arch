import * as dotenv from 'dotenv'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata'

import applicationStarter from './api/applicationStarter'
import Logger from './infrastructure/log/logger'

dotenv.config()

const appType = process.env.APP_TYPE ?? process.argv.slice(2)[0]
const appName = process.env.APP_NAME ?? process.argv.slice(2)[1];

(async (): Promise<void> => {
  Logger.info(`Initializing application ${appName} -> ${appType}`)

  await applicationStarter(appType, appName)
})().catch((err) => {
  Logger.error(`FATAL ERROR: ${err}`)
})
