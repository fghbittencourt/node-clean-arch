import { DataSource } from 'typeorm'

import { DatabaseConnection } from '../../infrastructure/base/repositories/databaseConnection'
import Logger from '../../infrastructure/log/logger'
import AppDataSource from './appDataSource'

export default class DefaultConnection implements DatabaseConnection {
  #disconnect = async (): Promise<void> => {
    if (this.datasource) {
      await this.datasource.destroy()

      Logger.debug('Closed connection to Postgres')
    }

    process.exit(1)
  }

  connect = async (): Promise<void> => {
    Logger.debug('Connecting to Postgres...')

    try {
      this.datasource = await AppDataSource.initialize()

      Logger.debug(`Connected to database on ${this.constructor.name}!`)
    } catch (err) {
      Logger.error('Error connecting to Postgres', {
        error: err.message,
      })

      throw err
    }
  }

  datasource?: DataSource

  constructor() {
    process.on('SIGINT', this.#disconnect).on('SIGTERM', this.#disconnect)
  }
}
