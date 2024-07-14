import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import snakeCaseKeys from 'snakecase-keys'
import { container } from 'tsyringe'
import { z } from 'zod'
import fromZodSchema from 'zod-to-json-schema'

import MakeBooking, { MakeBookingInput } from '../../useCases/makeBooking/makeBooking'

const createBookingSchema = z.object({
  customer: z.object({
    email: z.string().email(),
    name: z.string(),
  }),
  date: z.coerce.date(),
  flight_number: z.string(),
  passengers: z.array(
    z.object({
      full_name: z.string(),
      passport_number: z.string(),
    }),
  ),
})

const createBookingResponseSchema = z.object({
  booking_id: z.string().uuid(),
})

export default async (fastify: FastifyInstance) => {
  fastify.post(
    '/bookings',
    {
      handler: async (request: FastifyRequest, reply: FastifyReply) => {
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
      schema: {
        body: fromZodSchema(createBookingSchema),
        response: {
          201: fromZodSchema(createBookingResponseSchema),
        },
      },
    },
  )
}
