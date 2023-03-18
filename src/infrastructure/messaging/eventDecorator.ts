import { v4 as uuidv4 } from 'uuid';
import ApplicationEvent from './applicationEvent';

export interface CloudEvent {
  specversion: string;
  type: string;
  source: string;
  id: string;
  time: string;
  data: unknown;
}
export default class CloudEventDecorator {
  constructor(event: ApplicationEvent) {
    this.#event = event;
  }

  #event: ApplicationEvent;

  decorateEvent = async (): Promise<CloudEvent> => {
    const obj = this.#event;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { topic, attributes, ...rest } = obj;

    const cloudEvent: CloudEvent = {
      specversion: '1.0',
      type: `${process.env.EVENT_SOURCE_PREFIX}.${process.env.APP_NAME}.${
        this.#event.constructor.name
      }`,
      source: process.env.APP_SOURCE!,
      id: uuidv4(),
      time: new Date().toISOString(),
      data: rest
    };

    return cloudEvent;
  };
}
