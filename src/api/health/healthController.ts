import { FastifyReply, FastifyRequest } from 'fastify'
import { injectable } from 'tsyringe'

import FastifyController from '../../infrastructure/base/api/fastifyController'
import Logger from '../../infrastructure/log/logger'

@injectable()
export default class HealthController implements FastifyController {
  handle = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    Logger.debug('handle - Calling Health Check')

    const check = {
      app: process.env.APP_NAME,
      httpStatus: 200,
      status: 'healthy',
      timestamp: Date.now(),
      uptime: process.uptime(),
    }

    reply.status(check.httpStatus).send(check)
    Logger.debug('handle - Called Health Check')
  }

  schema = {}
}
