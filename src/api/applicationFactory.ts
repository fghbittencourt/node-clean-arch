import App from '../infrastructure/base/api/app'
import HonoApp from './honoApp'
import WebApp from './webApp'

export default class ApplicationFactory {
  static create = (appName: string, startListening = true): App => {
    if (!appName) {
      throw new Error('APP_NAME must be defined')
    }

    if (appName === 'webapi') return new WebApp(appName, startListening)

    if (appName === 'honoapi') return new HonoApp()

    throw new Error('Could not create Application. Check for a valid APP_NAME')
  }
}
