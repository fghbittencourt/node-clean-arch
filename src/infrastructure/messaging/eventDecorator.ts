import { v4 as uuidv4 } from 'uuid'

import Message from './message'

export interface CloudEvent {
  data: unknown;
  id: string;
  source: string;
  specversion: string;
  time: string;
  type: string;
}
export default class CloudEventDecorator {
  #message: Message

  decorateEvent = async (): Promise<CloudEvent> => {
    const obj = this.#message

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { topic, ...rest } = obj

    const cloudEvent: CloudEvent = {
      data: rest,
      id: uuidv4(),
      source: process.env.APP_SOURCE!,
      specversion: '1.0',
      time: new Date().toISOString(),
      type: `${process.env.EVENT_SOURCE_PREFIX}.${process.env.APP_NAME}.${
        this.#message.constructor.name
      }`,
    }

    return cloudEvent
  }

  constructor(message: Message) {
    this.#message = message
  }
}
