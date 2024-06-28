import { faker } from '@faker-js/faker'
import request from 'supertest'

import App from '../../../../src/infrastructure/base/api/app'
import HTTPStatus from '../../../../src/infrastructure/base/api/httpStatus'
import testApp from '../../../testApp'

describe('ListFilesController testing', () => {
  let app: App

  beforeAll(async () => {
    app = await testApp()
  })

  beforeEach(async () => {})

  it('Should return 200 and on a proper /makeBooking call', async () => {
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

    const res = await request(app.server).post('/makeBooking').send(payload)

    expect(res.status).toEqual(HTTPStatus.OK)
    expect(res.body.bookingId).toBeDefined()
  })
})
