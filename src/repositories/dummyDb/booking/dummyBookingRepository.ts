import { injectable } from 'tsyringe';
import Booking from '../../../domain/booking/booking';
import BookingRepository from '../../../domain/booking/bookingRepository';
import Logger from '../../../infrastructure/log/logger';

@injectable()
export default class DummyBookingRepository implements BookingRepository {
  constructor() {}

  save = async (booking: Booking): Promise<Booking> => {
    Logger.debug('DummyDB: Booking saved', booking);
    return booking;
  };
}
