import { faker } from '@faker-js/faker'

import BookingRepository from '../../../../src/domain/booking/bookingRepository'
import BookingStatus from '../../../../src/domain/booking/bookingStatus'
import Publisher from '../../../../src/infrastructure/messaging/publisher/publisher'
import Sender from '../../../../src/infrastructure/messaging/sender/sender'
import MakeBooking from '../../../../src/useCases/makeBooking/makeBooking'
import mockedBookingRepository from '../../domain/booking/mockedBookingRepository'
import mockedPublisher from '../../infrastructure/messaging/publisher/mockedPublisher'
import mockedSender from '../../infrastructure/messaging/sender/mockedSender'

const uuid = faker.datatype.uuid()
jest.mock('uuid', () => ({
  v4: () => uuid,
}))

describe('MakeBooking Testing', () => {
  let repository: BookingRepository
  let useCase: MakeBooking
  let sender: Sender
  let publisher: Publisher

  beforeAll(() => {
    sender = mockedSender()
    publisher = mockedPublisher()
    repository = mockedBookingRepository()
    useCase = new MakeBooking(repository, sender, publisher)
  })

  it('Should create a booking', async () => {
    const input = {
      customer: { email: 'suzie@hotmail.com', name: 'Suzie' },
      date: new Date('2123-01-01'),
      flightNumber: 'AA-820',
      passengers: [{ name: 'John', passportNumber: '789' }],
    }

    const result = await useCase.execute(input)

    expect(result).toEqual({ bookingId: uuid })
    expect(repository.save).toHaveBeenCalledWith({
      bookingId: uuid,
      customer: input.customer,
      date: input.date,
      flightNumber: input.flightNumber,
      passengers: input.passengers,
      status: BookingStatus.CREATED,
    })
    expect(publisher.publish).toHaveBeenCalledWith({
      attributes: {},
      bookingId: uuid,
      date: input.date,
      flightNumber: input.flightNumber,
      status: BookingStatus.CREATED,
      topic: process.env.TOPIC_BOOKINGS!,
    })
    expect(sender.send).toHaveBeenCalledWith({
      attributes: {},
      bookingId: uuid,
      commandName: 'EmitTicketsCommand',
      date: input.date,
      delaySeconds: 1,
      flightNumber: input.flightNumber,
      passengers: input.passengers,
      queueName: process.env.QUEUE_EMIT_TICKETS!,
    })
  })

  it('Should log and throw error when get some workflow error', async () => {
    const input = {
      customer: { email: 'suzie@hotmail.com', name: 'Suzie' },
      date: new Date('2123-01-01'),
      flightNumber: 'AA-820',
      passengers: [{ name: 'John', passportNumber: '789' }],
    }
    jest.spyOn(repository, 'save').mockRejectedValue(new Error())

    await expect(useCase.execute(input)).rejects.toThrow()

    expect(repository.save).toHaveBeenCalledWith({
      bookingId: uuid,
      customer: input.customer,
      date: input.date,
      flightNumber: input.flightNumber,
      passengers: input.passengers,
      status: BookingStatus.CREATED,
    })
    expect(publisher.publish).not.toHaveBeenCalled()
    expect(sender.send).not.toHaveBeenCalled()
  })
})
