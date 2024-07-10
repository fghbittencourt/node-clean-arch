import webServer from './webserver'

export default async (appName: string, startListening = true): Promise<void> => {
  if (!appName) {
    throw new Error('APP_NAME must be defined')
  }

  if (appName === 'webapi') await webServer(appName, startListening)

  throw new Error('Could not create Application. Check for a valid APP_NAME')
}
