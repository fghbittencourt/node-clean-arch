import { injectable } from 'tsyringe'

import Passenger from '../../../domain/passenger/passenger'
import PassengerRepository from '../../../domain/passenger/passengerRepository'
import Logger from '../../../infrastructure/log/logger'

@injectable()
export default class DummyPassengerRepository implements PassengerRepository {
  save = async (passenger: Passenger): Promise<Passenger> => {
    Logger.debug('DummyDB: passenger saved', passenger)
    return passenger
  }

  constructor() {}
}
