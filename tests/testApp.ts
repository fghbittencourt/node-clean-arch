import ApplicationFactory from '../src/api/applicationFactory'

export const getHonoApp = async () => {
  const app = ApplicationFactory.create('honoapi', false)
  await app.start()
  return app
}

export const getFastifyApp = async () => {
  const app = ApplicationFactory.create('webapi', false)
  await app.start()
  return app
}
