import { Kafka, Producer, logLevel } from 'kafkajs'
import { injectable } from 'tsyringe'

import Logger from '../../log/logger'
import CloudEventDecorator from '../eventDecorator'
import Message from '../message'
import Sender from './sender'

@injectable()
export default class KafkaSender implements Sender {
  #producer?: Producer

  async #getProducer(): Promise<Producer> {
    if (!this.#producer) {
      const broker = new Kafka({
        brokers: process.env.KAFKA_BROKERS!.split(', '),
        clientId: process.env.APP_NAME!,
        // TODO threat this properly
        // connectionTimeout: process.env.KAFKA_CONNECTION_TIMEOUT,
        logLevel: logLevel.WARN,
        // requestTimeout: process.env.KAFKA_REQUEST_TIMEOUT,
      })

      this.#producer = broker.producer()
    }

    return this.#producer
  }

  async send(message: Message): Promise<void> {
    if (!message.topic) {
      throw new Error('Topic is required to send message. Check property "topic" on your event/command')
    }
    if (!message.messageType) {
      throw new Error('Message type is required to send message. Check property "messageType" on your event/command')
    }

    const decorator = new CloudEventDecorator(message)
    const messageToBeSend = await decorator.decorateEvent()

    try {
      const producer = await this.#getProducer()
      await producer.connect()

      await producer.send({
        messages: [{ value: JSON.stringify(messageToBeSend) }],
        // TODO threat this properly
        // timeout: process.env.KAFKA_PRODUCER_TIMEOUT,
        topic: message.topic,
      })

      Logger.debug(
        `Kafka Message Sender - ${message.messageType} sent to topic ${message.topic}`,
        message,
      )
    } catch (error) {
      Logger.error('Error while sending message to Kafka', { error })
      throw error
    }
  }

  async sendRaw(rawMessage: unknown, topic: string): Promise<void> {
    if (!topic) {
      throw new Error('Topic is required to send message.')
    }

    try {
      const producer = await this.#getProducer()
      await producer.connect()

      await producer.send({
        messages: [{ value: JSON.stringify(rawMessage) }],
        topic,
        // TODO threat this properly
        // timeout: process.env.KAFKA_PRODUCER_TIMEOUT,
      })

      Logger.debug(
        `Kafka Message Sender - rawMessage sent to topic ${topic}`,
        rawMessage,
      )
    } catch (error) {
      Logger.error('Error while sending rawMessage to Kafka', { error })
      throw error
    }
  }
}
