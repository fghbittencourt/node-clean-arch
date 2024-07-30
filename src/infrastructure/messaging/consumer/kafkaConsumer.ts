import {
  Consumer as KConsumer, Kafka, KafkaMessage, logLevel,
} from 'kafkajs'

import AsyncController from '../../base/api/asyncController'
import Logger from '../../log/logger'
import Sender from '../sender/sender'
import { ConsumerMode, KafkaConsumerOpts } from './kafkaConsumerOpts'
import kafkaMessageProcessor from './kafkaMessageProcessor'

/**
 * Runner for consuming messages from Kafka
 */
export default class KafkaConsumer {
  batchSize: number

  brookers: string[]

  consumer: KConsumer

  consumerMode: ConsumerMode

  controllers: AsyncController[]

  messageRetries: number

  sender: Sender

  stopped: boolean

  private constructor(options: KafkaConsumerOpts) {
    const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
    signalTraps.forEach((type) => {
      process.once(type, async () => {
        try {
          await this.#disconnect(type)
        } finally {
          process.kill(process.pid, type)
        }
      })
    })

    this.brookers = options.brookers
    this.stopped = true
    this.controllers = options.controllers
    this.messageRetries = options.messageRetries ?? 4
    this.sender = options.sender
    this.consumerMode = options.consumerMode ?? ConsumerMode.PROMISES

    if (options.batchSize === 'LIMITS_ARE_FOR_MUNICIPALITIES') {
      this.batchSize = Number.MAX_SAFE_INTEGER
    } else {
      this.batchSize = options.batchSize || 10
    }

    const kafka = new Kafka({
      brokers: this.brookers,
      // clientId: options.clientId,
      connectionTimeout: options.connectionTimeout,
      logLevel: logLevel.WARN,
      requestTimeout: options.requestTimeout,
    })

    this.consumer = kafka.consumer({
      groupId: options.groupId,
      // sessionTimeout: options.sessionTimeout,
    })
  }

  static async assertOptions(options: KafkaConsumerOpts): Promise<void> {
    if (!options.groupId) {
      throw new Error('Missing option groupId')
    }

    if (!options.brookers.length) {
      throw new Error('There must be at least one broker')
    }

    const topics = options.controllers.map((controller) => controller.topic)
    const uniqueTopics = Array.from(new Set(topics))
    if (options.controllers.length !== uniqueTopics.length) {
      throw new Error('Some controllers are consuming the same topic. Check your configuration!')
    }
  }

  static async create(options: KafkaConsumerOpts): Promise<KafkaConsumer> {
    await KafkaConsumer.assertOptions(options)
    const obj = new KafkaConsumer(options)

    return obj
  }

  async #disconnect(signal? : string): Promise<void> {
    if (!this.stopped) {
      try {
        await this.consumer?.stop()
        await this.consumer?.disconnect()
      } catch (error) {
        Logger.error('Error stopping Kafka Consumer', error)
      }
    }
    process.kill(process.pid, signal)
  }

  async #processMessage(
    controller: AsyncController,
    heartbeat: () => Promise<void>,
    isRunning: () => boolean,
    isStale: () => boolean,
    message: KafkaMessage,
    resolveOffset: (offset: string) => void,
    topic: string,
  ): Promise<void> {
    if (!isRunning() || isStale()) return

    Logger.debug('Consuming message', message)

    await kafkaMessageProcessor(
      message,
      this.messageRetries,
      controller,
      this.sender,
      topic,
    )

    resolveOffset(message.offset)
    await heartbeat()
  }

  async start(): Promise<void> {
    const topics = this.controllers.map((controller) => controller.topic)
    Logger.debug('Starting Kafka Consumer Topics', { topics })

    await this.consumer.connect()
    Logger.debug('Kafka Connected')
    await this.consumer.subscribe({ topics })
    Logger.debug('Kafka subscribed')
    await this.consumer.run({
      eachBatch: async ({
        batch,
        heartbeat,
        isRunning,
        isStale,
        resolveOffset,
      }) => {
        Logger.debug('Batch', batch)
        const controller = this.controllers.find((c) => c.topic === batch.topic)

        if (controller) {
          if (this.consumerMode === ConsumerMode.PROMISES) {
            const batchMessages = batch.messages.slice(0, this.batchSize)

            const promises = batchMessages.map(
              async (message) => this.#processMessage(
                controller,
                heartbeat,
                isRunning,
                isStale,
                message,
                resolveOffset,
                batch.topic,
              ),
            )

            await Promise.all(promises)
          } else {
            // SEQUENTIAL
            // eslint-disable-next-line no-restricted-syntax
            for (const message of batch.messages) {
              // eslint-disable-next-line no-await-in-loop
              await this.#processMessage(
                controller,
                heartbeat,
                isRunning,
                isStale,
                message,
                resolveOffset,
                batch.topic,
              )
            }
          }
        }
      },
      eachBatchAutoResolve: false,
    })
  }
}
