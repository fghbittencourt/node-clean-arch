import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

import Booking from '../../../../src/domain/booking/booking'
import BookingStatus from '../../../../src/domain/booking/bookingStatus'

export default Factory.define<Booking>(() => ({
  bookingId: faker.datatype.uuid(),
  confirmBooking: Booking.prototype.confirmBooking,
  customer: {
    email: faker.internet.email(),
    name: faker.name.fullName(),
  },
  date: faker.datatype.datetime({
    min: new Date(new Date().setDate(new Date().getDate() + 1)).getDate(),
  }),
  flightNumber: faker.datatype.string(),
  passengers: [
    { name: faker.name.fullName(), passportNumber: faker.datatype.string() },
  ],
  status: BookingStatus.CREATED,
}))
