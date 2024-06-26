import { faker } from '@faker-js/faker'

import Booking from '../../../../src/domain/booking/booking'
import BookingStatus from '../../../../src/domain/booking/bookingStatus'
import Passenger from '../../../../src/domain/booking/passenger'
import bookingFactory from './bookingFactory'

describe('Booking testing', () => {
  let booking: Booking

  it('should create a Booking object properly', async () => {
    const uuid = faker.string.uuid()
    const date = new Date(new Date().setDate(new Date().getDate() + 1)) // tomorrow
    const passengers = [
      { name: faker.person.fullName(), passportNumber: faker.string.alpha(8) },
      { name: faker.person.fullName(), passportNumber: faker.string.alpha(8) },
    ]
    const flightNumber = faker.airline.flightNumber()
    const customer = {
      email: faker.internet.email(),
      name: faker.name.fullName(),
    }

    booking = new Booking(uuid, date, passengers, flightNumber, customer)

    expect(booking.bookingId).toBe(uuid)
    expect(booking.status).toBe(BookingStatus.CREATED)
    expect(booking.date).toBe(date)
    expect(booking.passengers).toBe(passengers)
    expect(booking.flightNumber).toBe(flightNumber)
    expect(booking.customer).toBe(customer)
  })

  it('should not create a Booking object if it has an invalid date', async () => {
    const uuid = faker.string.uuid()
    const date = new Date('1998-01-01')
    const passengers = [
      { name: faker.person.fullName(), passportNumber: faker.string.alpha(8) },
      { name: faker.person.fullName(), passportNumber: faker.string.alpha(8) },
    ]
    const flightNumber = faker.airline.flightNumber()
    const customer = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
    }

    expect(
      () => new Booking(uuid, date, passengers, flightNumber, customer),
    ).toThrow('Date should be on the future')
  })

  it('should not create a Booking object if it has no passengers', async () => {
    const uuid = faker.string.uuid()
    const date = new Date('1998-01-01')
    const passengers: Passenger[] = []
    const flightNumber = faker.airline.flightNumber()
    const customer = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
    }

    expect(
      () => new Booking(uuid, date, passengers, flightNumber, customer),
    ).toThrow('Mininum of 1 passenger per booking')
  })

  it('should confirm the booking', async () => {
    booking = bookingFactory.build({
      date: new Date('2024-01-01'),
      status: BookingStatus.CREATED,
    })

    await booking.confirmBooking()

    expect(booking.status).toBe(BookingStatus.CONFIRMED)
  })

  it('should not change status while confirming whether booking is confirmed already', async () => {
    booking = bookingFactory.build({
      date: new Date('2024-01-01'),
      status: BookingStatus.CONFIRMED,
    })

    await booking.confirmBooking()

    expect(booking.status).toBe(BookingStatus.CONFIRMED)
  })
})
