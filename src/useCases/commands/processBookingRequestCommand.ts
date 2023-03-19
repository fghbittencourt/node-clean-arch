import Command from '../../infrastructure/messaging/command';

type MakeFlightReservationCommandPassenger = {
  name: string;
  passportNumber: string;
};

export default class MakeFlightReservationCommand extends Command {
  readonly queueName = process.env.QUEUE_FLIGHT_RESERVATION!;

  readonly commandName = 'MakeFlightReservationCommand';

  constructor(
    bookingId: string,
    date: Date,
    passengers: MakeFlightReservationCommandPassenger[],
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

  passengers: MakeFlightReservationCommandPassenger[];

  flightNumber: string;
}
