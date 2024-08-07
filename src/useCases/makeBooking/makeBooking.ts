import { inject, injectable } from 'tsyringe'
import { v4 as uuidv4 } from 'uuid'

import Booking from '../../domain/booking/booking'
import BookingCreatedEvent from '../../domain/booking/bookingCreatedEvent'
import BookingRepository from '../../domain/booking/bookingRepository'
import Passenger from '../../domain/passenger/passenger'
import PassengerRepository from '../../domain/passenger/passengerRepository'
import UseCaseInput from '../../infrastructure/base/useCase/useCaseInput'
import UseCaseOutput from '../../infrastructure/base/useCase/useCaseOutput'
import UseCaseSync from '../../infrastructure/base/useCase/useCaseSync'
import Logger from '../../infrastructure/log/logger'
import Sender from '../../infrastructure/messaging/sender/sender'
import EmitTicketsCommand from '../commands/EmitTicketsCommand'

export interface MakeBookingInput extends UseCaseInput {
  customer: { email: string; name: string };
  date: Date;
  flightNumber: string;
  passengers: { fullName: string; passportNumber: string }[];
}

export interface MakeBookingOutput extends UseCaseOutput {
  bookingId: string;
}

@injectable()
export default class MakeBooking implements UseCaseSync {
  constructor(
    @inject('BookingRepository') public readonly repository: BookingRepository,
    @inject('PassengerRepository') public readonly passengerRepository: PassengerRepository,
    @inject('Sender') public readonly sender: Sender,
  ) {}

  async execute(input: MakeBookingInput): Promise<MakeBookingOutput> {
    try {
      const passengers = await Promise.all(input.passengers.map(async (passenger) => {
        const existingPassenger = await this.passengerRepository.findByFullName(passenger.fullName)
        if (existingPassenger) return existingPassenger

        return new Passenger(
          uuidv4(),
          passenger.fullName,
          passenger.passportNumber,
        )
      }))

      const booking = new Booking(
        uuidv4(),
        input.date,
        passengers,
        input.flightNumber,
        input.customer,
      )

      passengers.forEach(async (passenger) => this.passengerRepository.save(passenger))
      await this.repository.save(booking)

      // Publishing event
      await this.sender.send(
        new BookingCreatedEvent(
          booking.id,
          booking.date,
          booking.status,
          booking.flightNumber,
        ),
      )

      // Send command to emit tickets
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
