import { FastifyReply, FastifyRequest } from 'fastify'
import { inject, injectable } from 'tsyringe'

import FastifyController from '../../infrastructure/base/api/fastifyController'
import HTTPStatus from '../../infrastructure/base/api/httpStatus'
import Logger from '../../infrastructure/log/logger'
import MakeBooking, { MakeBookingInput } from '../../useCases/makeBooking/makeBooking'

@injectable()
export default class MakeBookingController implements FastifyController {
  handle = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      Logger.debug('handle - Calling use case MakeBooking')

      const output = await this.useCase.execute(request.body as MakeBookingInput)

      Logger.debug('handle - Called use case MakeBooking')

      reply.send(output)
    } catch (error) {
      Logger.error(
        `handle - Error in MakeBookingController: ${error.message}`,
        {
          constructor: this.constructor.name,
        },
      )
      reply.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
  }

  schema = {
    body: {
      properties: {
        customer: { properties: { email: { type: 'string' }, name: { type: 'string' } }, type: 'object' },
        date: { type: 'string' },
        flightNumber: { type: 'number' },
        passengers: { type: 'array' },
      },
      required: ['flightNumber'],
      type: 'object',
    },
    response: {
      200: {
        properties: {
          bookingId: { type: 'string' },
        },
        type: 'object',
      },
    },
  }

  constructor(@inject(MakeBooking) public readonly useCase: MakeBooking) {}
}
