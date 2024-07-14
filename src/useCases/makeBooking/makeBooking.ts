import { inject, injectable } from 'tsyringe'
import { v4 as uuidv4 } from 'uuid'

import Booking from '../../domain/booking/booking'
import BookingCreatedEvent from '../../domain/booking/bookingCreatedEvent'
import BookingRepository from '../../domain/booking/bookingRepository'
import Passenger from '../../domain/passenger/passenger'
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
      // Domain objects
      const bookingId = uuidv4()
      const passengers = input.passengers.map((passenger) => new Passenger(
        uuidv4(),
        passenger.name,
        passenger.passportNumber,
        bookingId,
      ))

      const booking = new Booking(
        bookingId,
        input.date,
        passengers,
        input.flightNumber,
        input.customer,
      )

      // Saving
      await this.repository.save(booking)

      // Publish event
      await this.publisher.publish(
        new BookingCreatedEvent(
          booking.id,
          booking.date,
          booking.status,
          booking.flightNumber,
        ),
      )

      // Send command
      await this.sender.send(
        new EmitTicketsCommand(
          booking.id,
          booking.date,
          booking.passengers,
          booking.flightNumber,
        ),
      )

      return { bookingId: booking.id }
    } catch (err) {
      Logger.error(`Error in ${this.constructor.name}. `, {
        detail: err.detail,
        error: err.message,
      })

      throw err
    }
  }
}
