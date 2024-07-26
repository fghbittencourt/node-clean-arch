import { Kafka, Producer, logLevel } from 'kafkajs'

import Logger from '../../log/logger'
import CloudEventDecorator from '../eventDecorator'
import Message from '../message'
import Sender from './sender'

export default class KafkaSender implements Sender {
  #disconnect = async (): Promise<void> => {
    if (this.#producer) {
      try {
        const producer = await this.#getProducer()
        await producer.disconnect()

        Logger.info('Disconnected from Kafka')
      } catch (error) {
        Logger.warn('Error while disconnecting from Kafka', { error })
      }
    }
  }

  #producer?: Producer

  send = async (message: Message): Promise<void> => {
    if (!message.topic) {
      throw new Error('Topic is required to send message. Check property "topic" on your event/command')
    }

    const decorator = new CloudEventDecorator(message)
    const cloudEvent = await decorator.decorateEvent()

    try {
      const producer = await this.#getProducer()
      await producer.connect()

      await producer.send({
        messages: [{ value: JSON.stringify(cloudEvent) }],
        topic: message.topic,
        // TODO put timeout here
      })

      Logger.info(
        `Kafka Message Sender - ${message.constructor.name} published on topic ${message.topic}`,
        { message },
      )
    } catch (error) {
      Logger.error('Error while sending message to Kafka', { error })
      throw error
    }
  }

  constructor() {
    process.on('SIGINT', this.#disconnect).on('SIGTERM', this.#disconnect)
  }

  async #getProducer(): Promise<Producer> {
    if (!this.#producer) {
      const broker = new Kafka({
        brokers: process.env.KAFKA_BROKERS!.split(', '),
        clientId: process.env.KAFKA_GROUP_ID,
        logLevel: logLevel.INFO,
        //   sessionTimeout: <Number>,
        // TODO put timeout here and other variables
      })

      this.#producer = broker.producer()
    }

    return this.#producer
  }
}
