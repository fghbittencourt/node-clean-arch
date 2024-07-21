import Logger from '../../log/logger'
import Message from '../message'
import Sender from './sender'

export default class DummySender implements Sender {
  send = async (message: Message): Promise<void> => {
    Logger.info(
      `Dummy Message Sender - ${message.constructor.name} sent`,
      message,
    )
  }

  sendMany = async (
    message: Message[],
    queueName: string,
  ): Promise<void> => {
    Logger.info(
      `Dummy Message Sender - ${message.constructor.name} sent on queue ${queueName}`,
      message,
    )
  }
}
