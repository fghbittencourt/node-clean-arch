import Booking from './booking';

export default interface BookingRepository {
  findByBookingId(
    bookingId: string
  ): Promise<Booking | null | undefined>;
  save(booking: Booking): Promise<Booking>;
  remove(booking: Booking): Promise<void>;
}
