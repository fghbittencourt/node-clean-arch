import { FastifyInstance } from 'fastify'
import { container } from 'tsyringe'

import HealthController from './health/healthController'
import MakeBookingController from './makeBooking/makeBookingController'

export default async (server : FastifyInstance): Promise<FastifyInstance> => {
  const healthController = container.resolve(HealthController)
  server.get('/', healthController.handle)

  const makeBookingController = container.resolve(MakeBookingController)
  server.post('/makeBooking', { schema: makeBookingController.schema }, makeBookingController.handle)

  return server
}
