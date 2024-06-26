import BookingStatus from './bookingStatus'
import Passenger from './passenger'

type Tickets = {
  passenger: Passenger;
  reservationStatus: 'DENIED' | 'OK';
  ticketNumber: string;
};

type Customer = {
  email: string;
  name: string;
};

export default class Booking {
  bookingId: string

  customer: Customer

  date: Date

  flightNumber: string

  passengers: Passenger[]

  status: BookingStatus

  tickets?: Tickets[]

  constructor(
    bookingId: string,
    date: Date,
    passengers: Passenger[],
    flightNumber: string,
    customer: Customer,
  ) {
    this.bookingId = bookingId
    this.date = date
    this.status = BookingStatus.CREATED
    this.passengers = passengers
    this.flightNumber = flightNumber
    this.tickets = undefined
    this.customer = customer

    if (!passengers.length) throw new Error('Mininum of 1 passenger per booking')

    if (date < new Date()) throw new Error('Date should be on the future')
  }

  async confirmBooking(): Promise<void> {
    if (this.status === BookingStatus.CREATED) this.status = BookingStatus.CONFIRMED
  }
}
