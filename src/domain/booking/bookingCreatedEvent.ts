import Message from '../../infrastructure/messaging/message'
import BookingStatus from './bookingStatus'

export default class BookingCreatedEvent implements Message {
  date: Date

  flightNumber: string

  id: string

  messageType = 'BookingCreatedEvent'

  status: BookingStatus

  readonly topic = process.env.TOPIC_BOOKINGS!

  constructor(
    id: string,
    date: Date,
    status: BookingStatus,
    flightNumber: string,
  ) {
    this.id = id
    this.date = date
    this.status = status
    this.flightNumber = flightNumber
  }
}
