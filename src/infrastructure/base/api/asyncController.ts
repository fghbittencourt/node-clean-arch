import Message from '../../messaging/message'

export default abstract class AsyncController {
  abstract handle(receivedMessage: Message): Promise<void>;

  abstract topic(): string;
}
