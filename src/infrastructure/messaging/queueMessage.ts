import Message from './message';

export default abstract class QueueMessage extends Message {
  delaySeconds = 1;

  abstract readonly queueName: string;
}
