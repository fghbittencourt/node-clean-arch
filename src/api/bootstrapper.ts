import { DependencyContainer, instanceCachingFactory } from 'tsyringe'

import BookingRepository from '../domain/booking/bookingRepository'
import PassengerRepository from '../domain/passenger/passengerRepository'
import Logger from '../infrastructure/log/logger'
import DummySender from '../infrastructure/messaging/sender/dummySender'
import KafkaSender from '../infrastructure/messaging/sender/kafkaSender'
import Sender from '../infrastructure/messaging/sender/sender'
import DummyBookingRepository from '../repositories/dummyDb/booking/dummyBookingRepository'
import DummyPassengerRepository from '../repositories/dummyDb/passenger/dummyPassengerRepository'
import PostgresBookingRepository from '../repositories/postgres/booking/postgresBookingRepository'
import DefaultConnection from '../repositories/postgres/defaultConnection'
import PostgresPassengerRepository from '../repositories/postgres/passenger/postgresPassengerRepository'

const registerRepos = async (container: DependencyContainer): Promise<void> => {
  if (process.env.DB_ENGINE === 'dummy') {
    container.register<BookingRepository>('BookingRepository', {
      useClass: DummyBookingRepository,
    })

    container.register<PassengerRepository>('PassengerRepository', {
      useClass: DummyPassengerRepository,
    })
  }

  if (process.env.DB_ENGINE === 'postgres') {
    const defaultConnection = new DefaultConnection()
    await defaultConnection.connect()

    container.register<DefaultConnection>('DefaultConnection', {
      useFactory: instanceCachingFactory(() => defaultConnection),
    })

    container.registerInstance(
      'DefaultEntityManager',
      defaultConnection.datasource!.manager,
    )

    container.register<BookingRepository>('BookingRepository', {
      useClass: PostgresBookingRepository,
    })

    container.register<PassengerRepository>('PassengerRepository', {
      useClass: PostgresPassengerRepository,
    })
  }
}

const registerMessageSender = async (
  container: DependencyContainer,
): Promise<void> => {
  if (process.env.MESSAGE_SENDER === 'dummy') {
    container.register<Sender>('Sender', {
      useClass: DummySender,
    })
  }

  if (process.env.MESSAGE_SENDER === 'kafka') {
    // Register KafkaSender
    container.register<Sender>('Sender', {
      useClass: KafkaSender,
    })
  }
}

export default async (container: DependencyContainer): Promise<void> => {
  Logger.debug('Bootstrapper initializing...')
  // Be careful, the order of these calls are important
  await registerRepos(container)
  await registerMessageSender(container)

  Logger.debug('Bootstrapper initialized!')
}
