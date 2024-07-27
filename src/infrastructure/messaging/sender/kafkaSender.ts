import { Kafka, Producer, logLevel } from 'kafkajs'
import { injectable } from 'tsyringe'

import Logger from '../../log/logger'
import CloudEventDecorator from '../eventDecorator'
import Message from '../message'
import Sender from './sender'

@injectable()
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

  #dlqSufix : string

  #producer?: Producer

  #sendMessage = async (
    message: Message,
    topic: string,
    decorateMessageAsCloudEvent = true,
  ): Promise<void> => {
    if (!topic) {
      throw new Error('Topic is required to send message. Check property "topic" on your event/command')
    }

    let messageToBeSend : unknown = message
    if (decorateMessageAsCloudEvent) {
      const decorator = new CloudEventDecorator(message)
      const cloudEvent = await decorator.decorateEvent()

      messageToBeSend = cloudEvent
    }

    try {
      const producer = await this.#getProducer()
      await producer.connect()

      await producer.send({
        messages: [{ value: JSON.stringify(messageToBeSend) }],
        topic,
        // TODO put timeout here
      })

      Logger.info(
        `Kafka Message Sender - ${message.constructor.name} sent to topic ${topic}`,
        message,
      )
    } catch (error) {
      Logger.error('Error while sending message to Kafka', { error })
      throw error
    }
  }

  send = async (message: Message): Promise<void> => {
    await this.#sendMessage(message, message.topic)
  }

  sendToDLQ = async (rawMessage: Message, originalTopic: string): Promise<void> => {
    const dlqTopic = `${originalTopic}${this.#dlqSufix}`
    await this.#sendMessage(rawMessage, dlqTopic, false)
  }

  constructor() {
    this.#dlqSufix = '.DLQ'
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
