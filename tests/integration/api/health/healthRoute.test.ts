import { FastifyInstance } from 'fastify'

import HTTPStatus from '../../../../src/infrastructure/base/api/httpStatus'
import testWebServer from '../../../testWebServer'

describe('Bookings Route testing', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await testWebServer()
    await app.ready()
  })

  afterAll(() => app.close())

  it('Should return 200 on GET /', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/',
    })

    const result = res.json()
    expect(res.statusCode).toEqual(HTTPStatus.OK)
    expect(result.app).toBeDefined()
    expect(result.httpStatus).toBeDefined()
    expect(result.status).toBeDefined()
    expect(result.timestamp).toBeDefined()
    expect(result.uptime).toBeDefined()
  })
})
