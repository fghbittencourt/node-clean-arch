import Message from '../message'

export default interface Sender {
  send(messsage: Message): Promise<void>;
}
