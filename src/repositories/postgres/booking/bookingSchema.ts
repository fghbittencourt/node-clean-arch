import { EntitySchema } from 'typeorm'

import Booking, { Customer } from '../../../domain/booking/booking'
import BookingStatus from '../../../domain/booking/bookingStatus'

export default new EntitySchema<Booking>({
  columns: {
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
    id: {
      primary: true,
      type: 'uuid',
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
  // Same table reference
  embeddeds: {
    customer: {
      prefix: 'customer',
      schema: new EntitySchema<Customer>({
        columns: {
          email: {
            nullable: false,
            type: 'varchar',
          },
          name: {
            nullable: false,
            type: 'varchar',
          },
        },
        name: 'Customer',
      }),
    },
  },
  name: 'Bookings',
  relations: {
    // Many to many relationship
    passengers: {
      cascade: false,
      inverseSide: 'bookings',
      joinTable: true,
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      target: 'Passenger',
      type: 'many-to-many',
    },
  },
  target: Booking,
})
