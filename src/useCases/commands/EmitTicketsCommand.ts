import Message from '../../infrastructure/messaging/message'

type EmitTicketsCommandPassenger = {
  fullName: string;
  passportNumber: string;
};

export default class EmitTicketsCommand implements Message {
  bookingId: string

  date: Date

  flightNumber: string

  passengers: EmitTicketsCommandPassenger[]

  topic = process.env.TOPIC_EMIT_TICKETS!

  constructor(
    bookingId: string,
    date: Date,
    passengers: EmitTicketsCommandPassenger[],
    flightNumber: string,
  ) {
    this.bookingId = bookingId
    this.date = date
    this.passengers = passengers
    this.flightNumber = flightNumber
  }
}
