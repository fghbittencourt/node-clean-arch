import Passenger from './passenger'

export default interface PassengerRepository {
  findByFullName(fullName: string): Promise<null | Passenger>;
  save(passenger: Passenger): Promise<Passenger>;
}
