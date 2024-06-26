import ApplicationEvent from '../../infrastructure/messaging/applicationEvent'
import BookingStatus from './bookingStatus'

export default class BookingCreatedEvent extends ApplicationEvent {
  bookingId: string

  date: Date

  flightNumber: string

  status: BookingStatus

  readonly topic = process.env.TOPIC_BOOKINGS!

  constructor(
    bookingId: string,
    date: Date,
    status: BookingStatus,
    flightNumber: string,
  ) {
    super()
    this.bookingId = bookingId
    this.date = date
    this.status = status
    this.flightNumber = flightNumber
  }
}
