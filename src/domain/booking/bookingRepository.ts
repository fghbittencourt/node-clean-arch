import Booking from './booking';

export default interface BookingRepository {
  save(booking: Booking): Promise<Booking>;
}
