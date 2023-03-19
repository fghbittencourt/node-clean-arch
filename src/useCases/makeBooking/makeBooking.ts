import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import Booking from '../../domain/booking/booking';
import BookingRepository from '../../domain/booking/bookingRepository';
import UseCaseInput from '../../infrastructure/base/useCase/useCaseInput';
import UseCaseOutput from '../../infrastructure/base/useCase/useCaseOutput';
import UseCaseSync from '../../infrastructure/base/useCase/useCaseSync';
import Logger from '../../infrastructure/log/logger';
import Sender from '../../infrastructure/messaging/sender/sender';
import MakeFlightReservationCommand from '../commands/processBookingRequestCommand';

export interface MakeBookingInput extends UseCaseInput {
  date: Date;
  passengers: { name: string; passportNumber: string }[];
  flightNumber: string;
  customer: { name: string; email: string };
}

export interface MakeBookingOutput extends UseCaseOutput {
  bookingId: string;
}

@injectable()
export default class MakeBooking implements UseCaseSync {
  constructor(
    @inject('BookingRepository') public readonly repository: BookingRepository,
    @inject('Sender') public readonly sender: Sender
  ) {}

  async execute(input: MakeBookingInput): Promise<UseCaseOutput> {
    try {
      // Cria o objeto de domínio
      const booking = new Booking(
        uuidv4(),
        input.date,
        input.passengers,
        input.flightNumber,
        input.customer
      );

      // Persiste
      await this.repository.save(booking);

      const command = new MakeFlightReservationCommand(
        booking.bookingId,
        booking.date,
        booking.passengers,
        booking.flightNumber
      );
      // Envia ordem para próxima fase (async)
      await this.sender.send(command);

      return { bookingId: booking.bookingId };
    } catch (err) {
      Logger.error(`Error in ${this.constructor.name}. `, {
        error: err.message,
        detail: err.detail
      });

      throw err;
    }
  }
}
