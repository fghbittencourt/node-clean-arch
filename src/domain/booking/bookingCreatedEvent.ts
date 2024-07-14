import ApplicationEvent from '../../infrastructure/messaging/applicationEvent'
import BookingStatus from './bookingStatus'

export default class BookingCreatedEvent extends ApplicationEvent {
  date: Date

  flightNumber: string

  id: string

  status: BookingStatus

  readonly topic = process.env.TOPIC_BOOKINGS!

  constructor(
    id: string,
    date: Date,
    status: BookingStatus,
    flightNumber: string,
  ) {
    super()
    this.id = id
    this.date = date
    this.status = status
    this.flightNumber = flightNumber
  }
}
