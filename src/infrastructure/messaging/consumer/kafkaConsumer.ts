import { EventEmitter } from 'events'
import { Consumer as KConsumer, Kafka, logLevel } from 'kafkajs'

import AsyncController from '../../base/api/asyncController'
import Logger from '../../log/logger'
import Consumer, { ConsumerEvents } from './consumer'

export interface KafkaConsumerOpts {
  brookers: string[]
  controllers: AsyncController[]
  groupId: string;
  topics: string[];
}

export default class KafkaConsumer extends EventEmitter implements Consumer {
  static assertOptions = async (options: KafkaConsumerOpts): Promise<void> => {
    if (!options.groupId) {
      throw new Error('Missing option groupId')
    }
  }

  // Static methods
  static create = async (options: KafkaConsumerOpts): Promise<Consumer> => {
    await KafkaConsumer.assertOptions(options)
    const obj = new KafkaConsumer(options)

    return obj
  }

  // Properties
  brookers: string[]

  consumer: KConsumer

  controllers: AsyncController[]

  groupId: string

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

    const kafka = new Kafka({
      brokers: this.brookers,
      logLevel: logLevel.WARN,
    })

    this.consumer = kafka.consumer({ groupId: this.groupId })

    // kafka.consumer({
    //   groupId: <String>,
    //   partitionAssigners: <Array>,
    //   sessionTimeout: <Number>,
    //   rebalanceTimeout: <Number>,
    //   heartbeatInterval: <Number>,
    //   metadataMaxAge: <Number>,
    //   allowAutoTopicCreation: <Boolean>,
    //   maxBytesPerPartition: <Number>,
    //   minBytes: <Number>,
    //   maxBytes: <Number>,
    //   maxWaitTimeInMs: <Number>,
    //   retry: <Object>,
    //   maxInFlightRequests: <Number>,
    //   rackId: <String>
    // })
  }

  async #disconnect(): Promise<void> {
    if (!this.stopped) {
      try {
        Logger.info('Disconnecting consumer')
        await this.consumer?.stop()
      } catch (error) {
        Logger.error('Error stopping consumer', error)
      }
    }
  }

  // Events
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
          // Turn this shit into promises
          batch.messages.forEach(async (message) => {
            if (!isRunning() || isStale()) return

            const content = Buffer.from(message.value!)

            Logger.info(`Message processed!! ${content.toString('utf-8')}`)

            // process message
            this.emit('messageProcessed', message)
            resolveOffset(message.offset)
            await heartbeat()
          })
        },
        eachBatchAutoResolve: false,
      })
    }
  }

  async stop(): Promise<void> {
    Logger.debug('Stopping consumer')

    await this.#disconnect()

    this.stopped = true
    this.emit('stopped')
  }

  get isRunning(): boolean {
    throw new Error('Method not implemented.')
  }
}
