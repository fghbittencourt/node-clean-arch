import { Kafka, logLevel, Producer } from 'kafkajs'
import { injectable } from 'tsyringe'

import Logger from '../../log/logger'
import CloudEventDecorator from '../eventDecorator'
import Message from '../message'
import Sender from './sender'

@injectable()
export default class KafkaSender implements Sender {
  #producer?: Producer

  async send(message: Message): Promise<void> {
    if (!message.topic) {
      throw new Error('Topic is required to send message. Check property "topic" on your event/command')
    }
    if (!message.messageType) {
      throw new Error('Message type is required to send message. Check property "messageType" on your event/command')
    }

    const decorator = new CloudEventDecorator(message)
    const messageToBeSend = await decorator.decorateEvent()
    const timeout = process.env.KAFKA_PRODUCER_TIMEOUT

    try {
      const producer = await this.#getProducer()
      await producer.connect()

      await producer.send({
        messages: [{ value: JSON.stringify(messageToBeSend) }],
        timeout: timeout ? Number(timeout) : undefined,
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

    const timeout = process.env.KAFKA_PRODUCER_TIMEOUT

    try {
      const producer = await this.#getProducer()
      await producer.connect()

      await producer.send({
        messages: [{ value: JSON.stringify(rawMessage) }],
        timeout: timeout ? Number(timeout) : undefined,
        topic,
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

  async #getProducer(): Promise<Producer> {
    const connectionTimeout = process.env.KAFKA_CONNECTION_TIMEOUT
    const requestTimeout = process.env.KAFKA_REQUEST_TIMEOUT

    if (!this.#producer) {
      const broker = new Kafka({
        brokers: process.env.KAFKA_BROKERS!.split(', '),
        clientId: `${process.env.APP_NAME!}-${process.pid.toString()}`,
        connectionTimeout: connectionTimeout ? Number(connectionTimeout) : undefined,
        logLevel: logLevel.WARN,
        requestTimeout: requestTimeout ? Number(requestTimeout) : undefined,
      })

      this.#producer = broker.producer()
    }

    return this.#producer
  }
}
