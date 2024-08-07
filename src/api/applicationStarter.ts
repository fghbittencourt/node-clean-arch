import webServer from './webserver'
import worker from './worker'

export default async (
  appType: string,
  appName: string,
  startListening = true,
): Promise<void> => {
  if (!appType) {
    throw new Error('APP_TYPE must be defined')
  }

  if (!appName) {
    throw new Error('APP_NAME must be defined')
  }

  if (appType === 'webapi') await webServer(appName, startListening)

  if (appType === 'worker') await worker(appName)
}
