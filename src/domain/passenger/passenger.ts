import Booking from '../booking/booking'

export default class Passenger {
  bookings: Booking[]

  createdAt: Date

  id: string

  name: string

  passportNumber: string

  updatedAt: Date

  constructor(
    id: string,
    name: string,
    passportNumber: string,
    bookings: Booking[],
  ) {
    this.id = id
    this.name = name
    this.passportNumber = passportNumber
    this.bookings = bookings
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
