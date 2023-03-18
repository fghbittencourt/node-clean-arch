import Logger from '../../log/logger';
import CloudEventDecorator from '../eventDecorator';
import TopicMessage from '../topicMessage';
import Publisher from './publisher';

export default class DummyPublisher implements Publisher {
  publish = async (message: TopicMessage): Promise<void> => {
    const decorator = new CloudEventDecorator(message);
    const cloudEvent = await decorator.decorateEvent();

    Logger.info(
      `Dummy Bus - ${message.constructor.name} published on topic ${message.topic}`,
      { event: cloudEvent }
    );
  };
}
