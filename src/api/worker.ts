import { container } from 'tsyringe'
import { Worker } from 'worker_threads'

import Logger from '../infrastructure/log/logger'
import KafkaConsumer from '../infrastructure/messaging/consumer/kafkaConsumer'
import KafkaSender from '../infrastructure/messaging/sender/kafkaSender'
import bootstrapper from './bootstrapper'
import EmitTicketsController from './tickets/emitTicketsController'
import ErrorController from './tickets/errorController'

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
  const errorController = new ErrorController()
  const controllers = [controllerEmitTickets, errorController]

  // Consumer
  const consumer = await KafkaConsumer.create(
    {
      brookers: process.env.KAFKA_BROKERS?.split(',') || [],
      clientId: process.env.APP_NAME!,
      controllers,
      groupId: appName,
      sender: container.resolve(KafkaSender),
    },
  )

  // Health check
  const workerPath = await getWorkerPath()
  const worker = new Worker(workerPath)
  worker.on('error', (err) => {
    Logger.error('Worker - healthRouteError', err)
  })

  // Start the worker process
  await consumer.start()
}
