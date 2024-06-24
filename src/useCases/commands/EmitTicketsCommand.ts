import Command from '../../infrastructure/messaging/command';

type EmitTicketsCommandPassenger = {
  name: string;
  passportNumber: string;
};

export default class EmitTicketsCommand extends Command {
  readonly queueName = process.env.QUEUE_EMIT_TICKETS!;

  readonly commandName = 'EmitTicketsCommand';

  constructor(
    bookingId: string,
    date: Date,
    passengers: EmitTicketsCommandPassenger[],
    flightNumber: string
  ) {
    super();

    this.bookingId = bookingId;
    this.date = date;
    this.passengers = passengers;
    this.flightNumber = flightNumber;
  }

  bookingId: string;

  date: Date;

  passengers: EmitTicketsCommandPassenger[];

  flightNumber: string;
}
