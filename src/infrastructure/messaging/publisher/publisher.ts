import TopicMessage from '../topicMessage'

export default interface Publisher {
  publish(message: TopicMessage): Promise<void>;
}
