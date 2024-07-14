import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

import Passenger from '../../../../src/domain/passenger/passenger'

export default Factory.define<Passenger>(() => ({
  bookings: [],
  createdAt: faker.date.anytime(),
  fullName: faker.person.fullName(),
  id: faker.string.uuid(),
  passportNumber: faker.string.alpha(8),
  updatedAt: faker.date.anytime(),
}))
