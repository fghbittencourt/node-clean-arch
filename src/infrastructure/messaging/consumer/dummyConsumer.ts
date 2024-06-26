/* eslint-disable @typescript-eslint/no-unused-vars */
import Logger from '../../log/logger'
import Consumer, { ConsumerEvents } from './consumer'

export default class DummyConsumer implements Consumer {
  #running = false

  #sleep = async (ms: number): Promise<void> => new Promise((resolve, _) => {
    setTimeout(resolve, ms)
  })

  start = async (): Promise<void> => {
    this.#running = true
    Logger.debug('DummyConsumer started')

    while (this.#running) {
      // eslint-disable-next-line no-await-in-loop
      await this.#sleep(1000)
    }
  }

  stop = async (): Promise<void> => {
    this.#running = false
    Logger.debug('DummyConsumer attempt to stop')
  }

  constructor() {
    process.on('SIGINT', this.stop).on('SIGTERM', this.stop)
  }

  addHandler<T extends keyof ConsumerEvents>(
    event: T,
    handler: (...args: unknown[]) => void,
  ): void {
    Logger.debug(`DummyConsumer added handler ${event.toString()}`)
  }

  removeHandler<T extends keyof ConsumerEvents>(event: T): void {
    Logger.debug(`DummyConsumer removed handler ${event.toString()}`)
  }

  public get isRunning(): boolean {
    return this.#running
  }
}
