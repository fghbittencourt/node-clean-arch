import BookingStatus from './bookingStatus';
import Passenger from './passenger';

interface FlightReservation {
  ticketNumber: string;
  reservationStatus: 'OK' | 'DENIED';
}

interface Customer {
  name: string;
  email: string;
}

export default class Booking {
  constructor(
    bookingId: string,
    date: Date,
    passengers: Passenger[],
    flightNumber: string,
    customer: Customer
  ) {
    this.bookingId = bookingId;
    this.date = date;
    this.status = BookingStatus.CREATED;
    this.passengers = passengers;
    this.flightNumber = flightNumber;
    this.customer = customer;

    if (!passengers.length)
      throw new Error('Mininum of 1 passenger per booking');

    if (date < new Date()) throw new Error('Date should be on the future');
  }

  bookingId: string;

  date: Date;

  status: BookingStatus;

  passengers: Passenger[];

  flightNumber: string;

  reservation?: FlightReservation;

  customer: Customer;

  async confirmBooking(): Promise<void> {
    if (this.status === BookingStatus.CREATED)
      this.status = BookingStatus.CONFIRMED;
  }
}
