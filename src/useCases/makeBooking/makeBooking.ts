import { inject, injectable } from 'tsyringe'
import { v4 as uuidv4 } from 'uuid'

import Booking from '../../domain/booking/booking'
import BookingCreatedEvent from '../../domain/booking/bookingCreatedEvent'
import BookingRepository from '../../domain/booking/bookingRepository'
import UseCaseInput from '../../infrastructure/base/useCase/useCaseInput'
import UseCaseOutput from '../../infrastructure/base/useCase/useCaseOutput'
import UseCaseSync from '../../infrastructure/base/useCase/useCaseSync'
import Logger from '../../infrastructure/log/logger'
import Publisher from '../../infrastructure/messaging/publisher/publisher'
import Sender from '../../infrastructure/messaging/sender/sender'
import EmitTicketsCommand from '../commands/EmitTicketsCommand'

export interface MakeBookingInput extends UseCaseInput {
  customer: { email: string; name: string };
  date: Date;
  flightNumber: string;
  passengers: { name: string; passportNumber: string }[];
}

export interface MakeBookingOutput extends UseCaseOutput {
  bookingId: string;
}

@injectable()
export default class MakeBooking implements UseCaseSync {
  constructor(
    @inject('BookingRepository') public readonly repository: BookingRepository,
    @inject('Sender') public readonly sender: Sender,
    @inject('Publisher') public readonly publisher: Publisher,
  ) {}

  async execute(input: MakeBookingInput): Promise<MakeBookingOutput> {
    try {
      // Cria o objeto de domínio
      const booking = new Booking(
        uuidv4(),
        input.date,
        input.passengers,
        input.flightNumber,
        input.customer,
      )

      // Persiste
      await this.repository.save(booking)

      // Notifica o mundo do que acabou de acontecer
      await this.publisher.publish(
        new BookingCreatedEvent(
          booking.bookingId,
          booking.date,
          booking.status,
          booking.flightNumber,
        ),
      )

      // Envia ordem para próxima fase (async)
      await this.sender.send(
        new EmitTicketsCommand(
          booking.bookingId,
          booking.date,
          booking.passengers,
          booking.flightNumber,
        ),
      )

      return { bookingId: booking.bookingId }
    } catch (err) {
      Logger.error(`Error in ${this.constructor.name}. `, {
        detail: err.detail,
        error: err.message,
      })

      throw err
    }
  }
}
