export default class Passenger {
  bookingId: string

  createdAt: Date

  name: string

  passengerId: string

  passportNumber: string

  updatedAt: Date

  constructor(
    passengerId: string,
    name: string,
    passportNumber: string,
    bookingId: string,
  ) {
    this.passengerId = passengerId
    this.name = name
    this.passportNumber = passportNumber
    this.bookingId = bookingId
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
