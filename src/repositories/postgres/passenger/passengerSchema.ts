import { EntitySchema } from 'typeorm'

import Passenger from '../../../domain/passenger/passenger'

export default new EntitySchema<Passenger>({
  columns: {
    createdAt: {
      createDate: true,
      nullable: false,
      type: 'timestamp',
    },
    fullName: {
      nullable: false,
      type: 'varchar',
    },
    id: {
      primary: true,
      type: 'uuid',
    },
    passportNumber: {
      nullable: false,
      type: 'varchar',
    },
    updatedAt: {
      createDate: true,
      nullable: false,
      type: 'timestamp',
    },
  },
  name: 'Passengers',
  relations: {
    // Many to many relationship
    bookings: {
      cascade: false,
      inverseSide: 'passengers',
      target: 'Booking',
      type: 'many-to-many',
    },
  },
  target: Passenger,
})
