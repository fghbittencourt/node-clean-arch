import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

import Booking from '../../../../src/domain/booking/booking'
import BookingStatus from '../../../../src/domain/booking/bookingStatus'

export default Factory.define<Booking>(() => ({
  confirmBooking: Booking.prototype.confirmBooking,
  createdAt: faker.date.anytime(),
  customer: {
    email: faker.internet.email(),
    name: faker.person.fullName(),
  },
  date: faker.date.soon(),
  flightNumber: faker.airline.flightNumber(),
  id: faker.string.uuid(),
  passengers: [],
  status: BookingStatus.CREATED,
  updatedAt: faker.date.anytime(),
}))
