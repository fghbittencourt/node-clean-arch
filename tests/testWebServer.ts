import webserver from '../src/api/webserver'

export default async () => {
  const app = webserver('test_webapi', false)
  return app
}
