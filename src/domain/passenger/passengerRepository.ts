import Passenger from './passenger'

export default interface PassengerRepository {
  findByFullName(fullName: string): Promise<Passenger | null>;
  save(passenger: Passenger): Promise<Passenger>;
}
