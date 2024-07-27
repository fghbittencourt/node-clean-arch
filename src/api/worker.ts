import { container } from 'tsyringe'
import { Worker } from 'worker_threads'

import Logger from '../infrastructure/log/logger'
import KafkaConsumer from '../infrastructure/messaging/consumer/kafkaConsumer'
import KafkaSender from '../infrastructure/messaging/sender/kafkaSender'
import bootstrapper from './bootstrapper'
import EmitTicketsController from './tickets/emitTicketsController'
import SomethingController from './tickets/errorController'

const getWorkerPath = async (): Promise<string> => {
  const env = process.env.NODE_ENV
  const basePath = '/src/api/health/asyncHealthRoute.js'

  if (env && env === 'production') {
    return `.${basePath}`
  }

  return `./dist/${basePath}`
}

export default async (appName: string): Promise<void> => {
  // First we initiate the bootstrapper
  await bootstrapper(container)

  // Controllers
  const controllerEmitTickets = new EmitTicketsController()
  const somethingController = new SomethingController()
  const controllers = [controllerEmitTickets, somethingController]

  Logger.info(`Worker ${appName} initializing...`)

  // Sender

  // Consumer
  const consumer = await KafkaConsumer.create(
    {
      brookers: process.env.KAFKA_BROKERS?.split(',') || [],
      controllers,
      groupId: appName,
      sender: container.resolve(KafkaSender),
      topics: controllers.map((c) => c.topic()),
    },
  )

  // Setting up loggers
  consumer.addHandler('timeoutError', (err) => {
    Logger.error('Worker - timeoutError', err)
  })

  consumer.addHandler('processingError', (err) => {
    Logger.error('Worker - processingError', err)
  })

  consumer.addHandler('messageProcessed', (message) => {
    Logger.info('Worker - Message Processed', message)
  })

  consumer.addHandler('started', () => {
    Logger.info('Worker - started')
  })

  // Health check
  const workerPath = await getWorkerPath()
  const worker = new Worker(workerPath)
  worker.on('error', (err) => {
    Logger.error('Worker - healthRouteError', err)
  })

  // Start the worker process
  await consumer.start()
}
