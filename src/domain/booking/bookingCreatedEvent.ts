import ApplicationEvent from '../../infrastructure/messaging/applicationEvent';
import BookingStatus from './bookingStatus';

export default class BookingCreatedEvent extends ApplicationEvent {
  constructor(
    bookingId: string,
    date: Date,
    status: BookingStatus,
    flightNumber: string
  ) {
    super();
    this.bookingId = bookingId;
    this.date = date;
    this.status = status;
    this.flightNumber = flightNumber;
  }

  bookingId: string;

  date: Date;

  status: BookingStatus;

  flightNumber: string;

  readonly topic = process.env.TOPIC_BOOKINGS!;
}
