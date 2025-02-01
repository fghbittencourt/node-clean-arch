import { injectable } from 'tsyringe'

import Passenger from '../../../domain/passenger/passenger'
import PassengerRepository from '../../../domain/passenger/passengerRepository'
import Logger from '../../../infrastructure/log/logger'

@injectable()
export default class DummyPassengerRepository implements PassengerRepository {
  async findByFullName(fullName: string): Promise<null | Passenger> {
    Logger.debug('DummyDB: passenger findByFullName', fullName)
    return Promise.resolve(null)
  }

  async save(passenger: Passenger): Promise<Passenger> {
    Logger.debug('DummyDB: passenger saved', passenger)
    return passenger
  }
}
