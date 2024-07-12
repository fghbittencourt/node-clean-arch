import { EntitySchema } from 'typeorm'

import Passenger from '../../../domain/passenger/passenger'

export default new EntitySchema<Passenger>({
  columns: {
    bookingId: {
      nullable: false,
      type: 'uuid',
    },
    createdAt: {
      createDate: true,
      nullable: false,
      type: 'timestamp',
    },
    name: {
      nullable: false,
      type: 'varchar',
    },
    passengerId: {
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
  name: Passenger.name,
  target: Passenger,
})
