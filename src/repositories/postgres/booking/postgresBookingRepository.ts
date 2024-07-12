import { inject } from 'tsyringe'
import { EntityManager, Repository } from 'typeorm'

import Booking from '../../../domain/booking/booking'
import BookingRepository from '../../../domain/booking/bookingRepository'

export default class PostgresBookingRepository implements BookingRepository {
  #repo: Repository<Booking>

  constructor(
    @inject('DefaultEntityManager') private readonly manager: EntityManager,
  ) {
    this.#repo = manager.getRepository(Booking)
  }

  async save(booking: Booking): Promise<Booking> {
    return this.#repo.save(booking)
  }
}
