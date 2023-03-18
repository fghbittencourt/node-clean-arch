/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReceivedMessage } from '../../messaging/consumer/consumer';

export default abstract class MessageController {
  abstract handle(receivedMessage: ReceivedMessage): Promise<void>;

  abstract getQueueUrl(): string;

  #parsedBody: any;

  public get getParsedBody(): any {
    return this.#parsedBody;
  }

  parseMessage = async (receivedMessage: ReceivedMessage): Promise<void> => {
    if (
      !receivedMessage ||
      !receivedMessage.message ||
      !receivedMessage.message.data
    ) {
      const errorMsg = `Malformed incoming message: ${JSON.stringify(
        receivedMessage
      )}`;
      throw new Error(errorMsg);
    }

    try {
      this.#parsedBody = JSON.parse(receivedMessage.message.data.toString());
    } catch (error) {
      const errorMsg = `Malformed message body: ${JSON.stringify(
        receivedMessage.message.data
      )}`;
      throw new Error(errorMsg);
    }
  };
}
