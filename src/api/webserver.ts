import helmet from '@fastify/helmet'
import fastify, { FastifyInstance } from 'fastify'
import { container } from 'tsyringe'

import Logger from '../infrastructure/log/logger'
import bookingsRoute from './bookings/bookingsRoute'
import bootstrapper from './bootstrapper'
import healthRoute from './health/healthRoute'
import snakeCaseMiddleware from './middleware/snakeCaseMiddleware'

const DEFAULT_PORT = 4500

export default async (
  appName: string,
  startListening = true,
): Promise<FastifyInstance> => {
  await bootstrapper(container)

  const app = fastify()

  /// MIDDLEWARES ///
  app.addHook('preHandler', snakeCaseMiddleware)
  app.register(helmet)

  /// ROUTES ///
  app.register(bookingsRoute)
  app.get('/', healthRoute)

  if (startListening) {
    const port = process.env.PORT || DEFAULT_PORT
    await app.listen({ host: '0.0.0.0', port: Number(port) })

    Logger.info(`${appName.toUpperCase()} is running on port ${port} 🤟🤟🤟`)
  }

  return app
}
