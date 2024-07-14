import { faker } from '@faker-js/faker'

import Passenger from '../../../../src/domain/passenger/passenger'

describe('Passenger testing', () => {
  let passenger: Passenger

  it('should create a Passenger object properly', async () => {
    const uuid = faker.string.uuid()
    const fullName = faker.person.fullName()
    const passportNumber = faker.string.alpha(8)

    passenger = new Passenger(uuid, fullName, passportNumber)

    expect(passenger.id).toBe(uuid)
    expect(passenger.fullName).toBe(fullName)
    expect(passenger.passportNumber).toBe(passportNumber)
    expect(passenger.bookings).toBeUndefined()
  })
})
