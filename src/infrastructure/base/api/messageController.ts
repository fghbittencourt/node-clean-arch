/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReceivedMessage } from '../../messaging/consumer/consumer'

export default abstract class MessageController {
  #parsedBody: any

  parseMessage = async (receivedMessage: ReceivedMessage): Promise<void> => {
    if (
      !receivedMessage
      || !receivedMessage.message
      || !receivedMessage.message.data
    ) {
      const errorMsg = `Malformed incoming message: ${JSON.stringify(
        receivedMessage,
      )}`
      throw new Error(errorMsg)
    }

    try {
      this.#parsedBody = JSON.parse(receivedMessage.message.data.toString())
    } catch (error) {
      const errorMsg = `Malformed message body: ${JSON.stringify(
        receivedMessage.message.data,
      )}`
      throw new Error(errorMsg)
    }
  }

  public get getParsedBody(): any {
    return this.#parsedBody
  }

  abstract getQueueUrl(): string;

  abstract handle(receivedMessage: ReceivedMessage): Promise<void>;
}
