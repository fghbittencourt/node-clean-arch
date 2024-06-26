import Command from '../../infrastructure/messaging/command'

type EmitTicketsCommandPassenger = {
  name: string;
  passportNumber: string;
};

export default class EmitTicketsCommand extends Command {
  bookingId: string

  readonly commandName = 'EmitTicketsCommand'

  date: Date

  flightNumber: string

  passengers: EmitTicketsCommandPassenger[]

  readonly queueName = process.env.QUEUE_EMIT_TICKETS!

  constructor(
    bookingId: string,
    date: Date,
    passengers: EmitTicketsCommandPassenger[],
    flightNumber: string,
  ) {
    super()

    this.bookingId = bookingId
    this.date = date
    this.passengers = passengers
    this.flightNumber = flightNumber
  }
}
