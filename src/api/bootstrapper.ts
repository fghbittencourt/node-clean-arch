import { DependencyContainer } from 'tsyringe';
import BookingRepository from '../domain/booking/bookingRepository';
import Logger from '../infrastructure/log/logger';
import DummyPublisher from '../infrastructure/messaging/publisher/dummyPublisher';
import Publisher from '../infrastructure/messaging/publisher/publisher';
import DummySender from '../infrastructure/messaging/sender/dummySender';
import Sender from '../infrastructure/messaging/sender/sender';
import DummyBookingRepository from '../repositories/dummyDb/booking/dummyBookingRepository';

const registerRepos = async (container: DependencyContainer): Promise<void> => {
  container.register<BookingRepository>('BookingRepository', {
    useClass: DummyBookingRepository
  });
};

const registerMessageSender = async (
  container: DependencyContainer
): Promise<void> => {
  container.register<Sender>('Sender', {
    useClass: DummySender
  });
};

const registerMessagePublisher = async (
  container: DependencyContainer
): Promise<void> => {
  container.register<Publisher>('Publisher', {
    useClass: DummyPublisher
  });
};

export default async (container: DependencyContainer): Promise<void> => {
  Logger.debug('Bootstrapper initializing...');
  // Be careful, the order of these calls are important
  await registerRepos(container);
  await registerMessageSender(container);
  await registerMessagePublisher(container);

  Logger.debug('Bootstrapper initialized!');
};
