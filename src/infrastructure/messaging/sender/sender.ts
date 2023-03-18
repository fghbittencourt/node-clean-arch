import QueueMessage from '../queueMessage';

export default interface Sender {
  send(messsage: QueueMessage): Promise<void>;
  sendMany(messages: QueueMessage[], queueName: string): Promise<void>;
}
