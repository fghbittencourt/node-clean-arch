import helmet from '@fastify/helmet'
import Fastify, { FastifyInstance } from 'fastify'
import { container } from 'tsyringe'

import App from '../infrastructure/base/api/app'
import Logger from '../infrastructure/log/logger'
import bootstrapper from './bootstrapper'
import router from './router'

export default class FastifyApp implements App {
  #app!: FastifyInstance

  #appName: string

  #listen = async (): Promise<void> => {
    const port = 4500

    await this.#app.listen({ host: '0.0.0.0', port })
    Logger.info(`App ${this.#appName} listening on port ${port} 🤟🤟🤟`)
  }

  #proceedInitialization = async (): Promise<void> => {
    this.#app = Fastify({
      logger: true,
    })
    this.#app.register(helmet)
    this.#app.register(router)

    if (this.#startListening) await this.#listen()
  }

  #startListening: boolean

  server: unknown

  start = async (): Promise<void> => {
    await bootstrapper(container)

    await this.#proceedInitialization()

    await this.#app.ready()
    this.server = this.#app.server
  }

  constructor(appName: string, startListening = true) {
    this.#startListening = startListening
    this.#appName = appName
  }
}
