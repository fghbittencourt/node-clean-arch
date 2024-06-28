import ApplicationFactory from '../src/api/applicationFactory'
import App from '../src/infrastructure/base/api/app'

const app = ApplicationFactory.create('webapi', false)

export default async (): Promise<App> => {
  await app.start()
  await app.ready()
  return app
}
