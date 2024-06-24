import Logger from '../../log/logger';
import QueueMessage from '../queueMessage';
import Sender from './sender';

export default class DummySender implements Sender {
  send = async (message: QueueMessage): Promise<void> => {
    Logger.info(
      `Dummy Message Sender - ${message.constructor.name} Sent`,
      message
    );
  };

  sendMany = async (
    message: QueueMessage[],
    queueName: string
  ): Promise<void> => {
    Logger.info(
      `Dummy Message Sender - ${message.constructor.name} Sent`,
      message
    );
  };
}
