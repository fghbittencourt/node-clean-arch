import Passenger from './passenger'

export default interface PassengerRepository {
  save(passenger: Passenger): Promise<Passenger>;
}
