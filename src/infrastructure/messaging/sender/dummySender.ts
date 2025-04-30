import Logger from '../../log/logger'
import Message from '../message'
import Sender from './sender'

export default class DummySender implements Sender {
  send = async (message: Message): Promise<void> => {
    Logger.debug(
      `Dummy Message Sender - ${message.messageType} sent`,
      message,
    )
  }

  sendRaw = async (rawMessage: unknown, topic: string): Promise<void> => {
    Logger.debug(
      `Dummy Message Sender - Message Raw ${topic} sent`,
      rawMessage,
    )
  }
}
