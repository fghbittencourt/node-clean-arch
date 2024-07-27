import { EventEmitter } from 'events'
import {
  Consumer as KConsumer, Kafka, KafkaMessage, logLevel,
} from 'kafkajs'
import promiseRetry from 'promise-retry'

import AsyncController from '../../base/api/asyncController'
import Logger from '../../log/logger'
import KafkaSender from '../sender/kafkaSender'
import Consumer, { ConsumerEvents } from './consumer'

interface ProcessMessage {
  controller: AsyncController
  heartbeat(): Promise<void>,
  isRunning(): boolean,
  isStale(): boolean
  message: KafkaMessage,
  resolveOffset(offset: string): void,
  topic: string
}

export interface KafkaConsumerOpts {
  batchSize?: 'LIMITS_ARE_FOR_MUNICIPALITIES' | number
  brookers: string[]
  controllers: AsyncController[]
  groupId: string;
  minMessageRetries?: number
  sender: KafkaSender
  topics: string[];
}

export default class KafkaConsumer extends EventEmitter implements Consumer {
  static assertOptions = async (options: KafkaConsumerOpts): Promise<void> => {
    if (!options.groupId) {
      throw new Error('Missing option groupId')
    }
  }

  static create = async (options: KafkaConsumerOpts): Promise<Consumer> => {
    await KafkaConsumer.assertOptions(options)
    const obj = new KafkaConsumer(options)

    return obj
  }

  batchSize: number

  brookers: string[]

  consumer: KConsumer

  controllers: AsyncController[]

  groupId: string

  minMessageRetries: number

  sender: KafkaSender

  stopped: boolean

  topics: string[]

  private constructor(options: KafkaConsumerOpts) {
    super()
    process.on('SIGINT', this.#disconnect).on('SIGTERM', this.#disconnect)
    this.brookers = options.brookers
    this.stopped = true
    this.groupId = options.groupId
    this.topics = options.topics
    this.controllers = options.controllers
    this.minMessageRetries = options.minMessageRetries ?? 4
    this.sender = options.sender

    if (options.batchSize === 'LIMITS_ARE_FOR_MUNICIPALITIES') {
      this.batchSize = Number.MAX_SAFE_INTEGER
    } else {
      this.batchSize = options.batchSize || 10
    }

    const kafka = new Kafka({
      brokers: this.brookers,
      logLevel: logLevel.WARN,
      // sessionTimeout: <Number>,
    })

    this.consumer = kafka.consumer({ groupId: this.groupId })
  }

  async #disconnect(): Promise<void> {
    if (!this.stopped) {
      try {
        await this.consumer?.stop()
      } catch (error) {
        Logger.error('Error stopping consumer', error)
      }
    }

    process.exit(1)
  }

  async #processMessage(data: ProcessMessage) {
    if (!data.isRunning() || data.isStale()) return

    const content = Buffer.from(data.message.value!)
    const jsonString = content.toString('utf-8')
    const rawMessage = JSON.parse(jsonString)

    // TODO put some logic to convert to defined message formats based on the payload
    const messageData = rawMessage.data // here I'm assuming it's a CloudEvent

    this.emit('messageReceived', rawMessage)

    await promiseRetry(async (retry, number) => {
      Logger.debug(`Attempt number ${number} on topic: ${data.topic}`)

      try {
        await data.controller.handle(messageData)

        this.emit('messageProcessed', rawMessage)
      } catch (error) {
        this.emit('processingError', error, rawMessage)
        retry(error)
      }
    }, { retries: this.minMessageRetries }).catch(async () => {
      await this.sender.sendToDLQ(rawMessage, data.topic)
      Logger.error(`Offset ${data.message.offset} has been put on DLQ`)
    })

    data.resolveOffset(data.message.offset)
    await data.heartbeat()
  }

  addHandler<T extends keyof ConsumerEvents>(
    event: T,
    handler: (...args: unknown[]) => void,
  ): void {
    this.on(event, handler)
  }

  emit<T extends keyof ConsumerEvents>(
    event: T,
    ...args: ConsumerEvents[T]
  ): boolean {
    return super.emit(event, ...args)
  }

  on<T extends keyof ConsumerEvents>(
    event: T,
    listener: (...args: unknown[]) => void,
  ): this {
    return super.on(event, listener)
  }

  once<T extends keyof ConsumerEvents>(
    event: T,
    listener: (...args: unknown[]) => void,
  ): this {
    return super.once(event, listener)
  }

  removeHandler<T extends keyof ConsumerEvents>(event: T): void {
    this.removeAllListeners(event)
  }

  async start(): Promise<void> {
    this.emit('started')

    if (this.stopped) {
      await this.consumer.connect()
      await this.consumer.subscribe({ topics: this.topics })
      await this.consumer.run({
        eachBatch: async ({
          batch,
          heartbeat,
          isRunning,
          isStale,
          resolveOffset,
        }) => {
          const controller = this.controllers.find((c) => c.topic() === batch.topic)

          if (controller) {
            const batchMessages = batch.messages.slice(0, this.batchSize)

            const promises = batchMessages.map(
              async (message) => this.#processMessage({
                controller,
                heartbeat,
                isRunning,
                isStale,
                message,
                resolveOffset,
                topic: batch.topic,
              }),
            )

            Logger.warn(`promises to be executed Length: ${promises.length}`)

            await Promise.all(promises)
          }
        },
        eachBatchAutoResolve: false,
      })
    }
  }

  async stop(): Promise<void> {
    await this.#disconnect()

    this.stopped = true
    this.emit('stopped')
  }

  get isRunning(): boolean {
    return !this.stopped
  }
}
