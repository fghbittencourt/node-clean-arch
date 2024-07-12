import { EntitySchema } from 'typeorm'

import Booking from '../../../domain/booking/booking'
import BookingStatus from '../../../domain/booking/bookingStatus'
import Passenger from '../../../domain/passenger/passenger'

export default new EntitySchema<Booking>({
  columns: {
    bookingId: {
      primary: true,
      type: 'uuid',
    },
    createdAt: {
      createDate: true,
      nullable: false,
      type: 'timestamp',
    },
    date: {
      nullable: false,
      type: 'timestamp',
    },
    flightNumber: {
      nullable: false,
      type: 'varchar',
    },
    status: {
      enum: BookingStatus,
      nullable: false,
      type: 'enum',
    },
    updatedAt: {
      createDate: true,
      nullable: false,
      type: 'timestamp',
    },
  },
  name: Booking.name,
  relations: {
    // Same table ref
    customer: {
      inverseSide: 'booking',
      joinColumn: true,
      target: 'Booking',
      type: 'one-to-one',
    },
    // One to many in different table
    passengers: {
      joinColumn: [
        {
          name: 'booking_id',
          referencedColumnName: 'bookingId',
        },
      ],
      target: Passenger.name,
      type: 'one-to-many',
    },
  },
  target: Booking,
})
