import { faker } from '@faker-js/faker'
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

  it('Should return 201 on POST /bookings', async () => {
    const payload = {
      customer: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
      date: faker.date.soon().toISOString(),
      flightNumber: faker.number.int(10000),
      passengers: [
        {
          name: faker.person.fullName(),
          passportNumber: faker.string.alpha(6),
        },
      ],
    }

    const res = await app.inject({
      method: 'POST',
      payload,
      url: '/bookings',
    })

    expect(res.statusCode).toEqual(HTTPStatus.CREATED)
    expect(res.json().booking_id).toBeDefined()
  })
})
