import Message from '../../messaging/message'

export default interface AsyncController {
  handle(receivedMessage: Message): Promise<void>;

  topic: string
}
