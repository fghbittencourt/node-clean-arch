import { faker } from '@faker-js/faker'

import BookingRepository from '../../../../src/domain/booking/bookingRepository'
import BookingStatus from '../../../../src/domain/booking/bookingStatus'
import PassengerRepository from '../../../../src/domain/passenger/passengerRepository'
import Sender from '../../../../src/infrastructure/messaging/sender/sender'
import MakeBooking from '../../../../src/useCases/makeBooking/makeBooking'
import mockedBookingRepository from '../../domain/booking/mockedBookingRepository'
import mockedPassengerRepository from '../../domain/passenger/mockedPassengerRepository'
import passengerFactory from '../../domain/passenger/passengerFactory'
import mockedSender from '../../infrastructure/messaging/sender/mockedSender'

const uuid = faker.string.uuid()
jest.mock('uuid', () => ({
  v4: () => uuid,
}))

describe('MakeBooking Testing', () => {
  let repository: BookingRepository
  let passengerRepository: PassengerRepository
  let useCase: MakeBooking
  let sender: Sender
  let defaultDate: Date

  beforeAll(() => {
    sender = mockedSender()
    repository = mockedBookingRepository()
    passengerRepository = mockedPassengerRepository()
    useCase = new MakeBooking(repository, passengerRepository, sender)

    defaultDate = new Date()
    jest.useFakeTimers().setSystemTime(defaultDate)
  })

  it('Should create a booking', async () => {
    const passengers = passengerFactory.buildList(2)
    const input = {
      customer: { email: faker.internet.email(), name: faker.person.fullName() },
      date: faker.date.soon(),
      flightNumber: faker.airline.flightNumber(),
      passengers,
    }
    jest.spyOn(passengerRepository, 'findByFullName')
      .mockResolvedValueOnce(passengers[0])
      .mockResolvedValueOnce(passengers[1])

    const result = await useCase.execute(input)

    expect(passengerRepository.findByFullName).toHaveBeenNthCalledWith(1, passengers[0].fullName)
    expect(passengerRepository.findByFullName).toHaveBeenNthCalledWith(2, passengers[1].fullName)
    expect(passengerRepository.save).toHaveBeenNthCalledWith(1, passengers[0])
    expect(passengerRepository.save).toHaveBeenNthCalledWith(2, passengers[1])
    expect(repository.save).toHaveBeenCalledWith({
      createdAt: defaultDate,
      customer: input.customer,
      date: input.date,
      flightNumber: input.flightNumber,
      id: uuid,
      passengers: input.passengers,
      status: BookingStatus.CREATED,
      updatedAt: defaultDate,
    })
    expect(sender.send).toHaveBeenNthCalledWith(1, {
      date: input.date,
      flightNumber: input.flightNumber,
      id: uuid,
      messageType: 'BookingCreatedEvent',
      status: BookingStatus.CREATED,
      topic: process.env.TOPIC_BOOKINGS!,
    })
    expect(sender.send).toHaveBeenNthCalledWith(2, {
      bookingId: uuid,
      date: input.date,
      flightNumber: input.flightNumber,
      messageType: 'EmitTicketsCommand',
      passengers: input.passengers,
      topic: process.env.TOPIC_EMIT_TICKETS!,
    })
    expect(result).toEqual({ bookingId: uuid })
  })

  it('Should log and throw error when get some error', async () => {
    const passengers = passengerFactory.buildList(1)
    const input = {
      customer: { email: faker.internet.email(), name: faker.person.fullName() },
      date: faker.date.soon(),
      flightNumber: faker.airline.flightNumber(),
      passengers,
    }
    jest.spyOn(passengerRepository, 'findByFullName').mockRejectedValue(new Error())

    await expect(useCase.execute(input)).rejects.toThrow()

    expect(passengerRepository.findByFullName).toHaveBeenCalledWith(passengers[0].fullName)
    expect(passengerRepository.save).not.toHaveBeenCalled()
    expect(repository.save).not.toHaveBeenCalled()
    expect(sender.send).not.toHaveBeenCalled()
  })
})
