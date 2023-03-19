import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import Booking from '../../../../src/domain/booking/booking';
import BookingStatus from '../../../../src/domain/booking/bookingStatus';

export default Factory.define<Booking>(() => {
  return {
    bookingId: faker.datatype.uuid(),
    date: faker.datatype.datetime({
      min: new Date(new Date().setDate(new Date().getDate() + 1)).getDate()
    }),
    status: BookingStatus.CREATED,
    passengers: [
      { name: faker.name.fullName(), passportNumber: faker.datatype.string() }
    ],
    flightNumber: faker.datatype.string(),
    customer: {
      name: faker.name.fullName(),
      email: faker.internet.email()
    },
    confirmBooking: Booking.prototype.confirmBooking
  };
});
