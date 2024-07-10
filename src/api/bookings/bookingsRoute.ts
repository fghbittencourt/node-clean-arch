import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import snakeCaseKeys from 'snakecase-keys'
import { container } from 'tsyringe'

import MakeBooking, { MakeBookingInput } from '../../useCases/makeBooking/makeBooking'

export default async (fastify: FastifyInstance) => {
  fastify.post(
    '/bookings',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const uc = container.resolve(MakeBooking)
      const input = request.body
      const output = await uc.execute(input as MakeBookingInput)

      return reply
        .status(201)
        .send(
          // turn keys into snake-case-pattern
          snakeCaseKeys({ ...output }),
        )
    },
  )
}
