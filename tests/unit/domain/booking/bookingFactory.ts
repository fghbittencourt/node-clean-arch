import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

import Booking from '../../../../src/domain/booking/booking'
import BookingStatus from '../../../../src/domain/booking/bookingStatus'

export default Factory.define<Booking>(() => ({
  bookingId: faker.string.uuid(),
  confirmBooking: Booking.prototype.confirmBooking,
  customer: {
    email: faker.internet.email(),
    name: faker.name.fullName(),
  },
  date: faker.date.soon(),
  flightNumber: faker.airline.flightNumber(),
  passengers: [
    { name: faker.name.fullName(), passportNumber: faker.string.alpha(8) },
  ],
  status: BookingStatus.CREATED,
}))
