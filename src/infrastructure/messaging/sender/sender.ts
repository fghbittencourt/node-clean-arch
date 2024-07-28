import Message from '../message'

export default interface Sender {
  send(messsage: Message): Promise<void>;
  sendRaw(rawMessage: unknown, topic: string): Promise<void>
}
