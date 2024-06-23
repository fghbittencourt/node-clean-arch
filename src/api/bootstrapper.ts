import { DependencyContainer } from 'tsyringe';
import Logger from '../infrastructure/log/logger';
import DummyPublisher from '../infrastructure/messaging/publisher/dummyPublisher';
import Publisher from '../infrastructure/messaging/publisher/publisher';
import DummySender from '../infrastructure/messaging/sender/dummySender';
import Sender from '../infrastructure/messaging/sender/sender';

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
  await registerMessageSender(container);
  await registerMessagePublisher(container);

  Logger.debug('Bootstrapper initialized!');
};
