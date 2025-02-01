import { inject, injectable } from 'tsyringe'
import { EntityManager, Repository } from 'typeorm'

import Passenger from '../../../domain/passenger/passenger'
import PassengerRepository from '../../../domain/passenger/passengerRepository'

@injectable()
export default class PostgresPassengerRepository implements PassengerRepository {
  #repo: Repository<Passenger>

  constructor(
    @inject('DefaultEntityManager') private readonly manager: EntityManager,
  ) {
    this.#repo = manager.getRepository(Passenger)
  }

  async findByFullName(fullName: string): Promise<null | Passenger> {
    return this.#repo.findOne({ where: { fullName } })
  }

  async save(passenger: Passenger): Promise<Passenger> {
    return this.#repo.save(passenger)
  }
}
