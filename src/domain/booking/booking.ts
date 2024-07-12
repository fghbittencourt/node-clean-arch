import Passenger from '../passenger/passenger'
import BookingStatus from './bookingStatus'

export interface Tickets {
  passenger: Passenger;
  reservationStatus: 'DENIED' | 'OK';
  ticketNumber: string;
}

export interface Customer {
  email: string;
  name: string;
}

export default class Booking {
  bookingId: string

  createdAt: Date

  customer: Customer

  date: Date

  flightNumber: string

  passengers: Passenger[]

  status: BookingStatus

  tickets?: Tickets[]

  updatedAt: Date

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
    this.createdAt = new Date()
    this.updatedAt = new Date()

    if (passengers?.length === 0) throw new Error('Mininum of 1 passenger per booking')

    if (date < new Date()) throw new Error('Date should be on the future')
  }

  async confirmBooking(): Promise<void> {
    if (this.status === BookingStatus.CREATED) this.status = BookingStatus.CONFIRMED
  }
}
