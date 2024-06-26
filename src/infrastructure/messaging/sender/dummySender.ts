import Logger from '../../log/logger'
import QueueMessage from '../queueMessage'
import Sender from './sender'

export default class DummySender implements Sender {
  send = async (message: QueueMessage): Promise<void> => {
    Logger.info(
      `Dummy Message Sender - ${message.constructor.name} sent`,
      message,
    )
  }

  sendMany = async (
    message: QueueMessage[],
    queueName: string,
  ): Promise<void> => {
    Logger.info(
      `Dummy Message Sender - ${message.constructor.name} sent on queue ${queueName}`,
      message,
    )
  }
}
