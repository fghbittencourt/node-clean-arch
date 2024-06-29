import { faker } from '@faker-js/faker'

import App from '../../../../src/infrastructure/base/api/app'
import HTTPStatus from '../../../../src/infrastructure/base/api/httpStatus'
import { getHonoApp } from '../../../testApp'

describe('BookingRoute testing', () => {
  let app: App

  beforeAll(async () => {
    app = await getHonoApp()
  })

  beforeEach(async () => {})

  it('Should return 201 and on a proper /booking call', async () => {
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
    const res = await app.server.request('/booking', {
      body: JSON.stringify(payload),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      method: 'POST',
    })

    expect(res.status).toEqual(HTTPStatus.CREATED)
    expect((await res.json()).bookingId).toBeDefined()
  })
})
