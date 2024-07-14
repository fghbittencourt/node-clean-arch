import Booking from '../booking/booking'

export default class Passenger {
  bookings?: Booking[]

  createdAt: Date

  fullName: string

  id: string

  passportNumber: string

  updatedAt: Date

  constructor(
    id: string,
    fullName: string,
    passportNumber: string,
  ) {
    this.id = id
    this.fullName = fullName
    this.passportNumber = passportNumber
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
