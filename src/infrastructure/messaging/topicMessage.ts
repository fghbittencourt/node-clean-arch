import Message from './message'

export default abstract class TopicMessage extends Message {
  abstract readonly topic: string;
}
