import express from 'express'
import { container } from 'tsyringe'

import App from '../infrastructure/base/api/app'
import Logger from '../infrastructure/log/logger'
import bootstrapper from './bootstrapper'
import routes from './router'

export default class WebApp implements App {
  #appName: string

  #expressApp!: express.Application

  #listen = async (): Promise<void> => {
    const port = process.env.APP_PORT || 4500

    this.#expressApp.listen(port, async () => {
      Logger.info(`App ${this.#appName} listening on port ${port} 🤟🤟🤟`)
    })
  }

  #proceedInitialization = async (): Promise<void> => {
    this.#expressApp = express()
    this.#expressApp.use(express.json())
    this.#expressApp.use(await routes())

    if (this.#startListening) await this.#listen()
  }

  #startListening: boolean

  start = async (): Promise<void> => {
    await bootstrapper(container)

    await this.#proceedInitialization()
  }

  constructor(appName: string, startListening = true) {
    this.#startListening = startListening
    this.#appName = appName
  }

  public get getApp(): unknown {
    return this.#expressApp
  }
}
