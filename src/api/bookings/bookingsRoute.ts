import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { container } from 'tsyringe'
import { z } from 'zod'

import Logger from '../../infrastructure/log/logger'
import MakeBooking from '../../useCases/makeBooking/makeBooking'

const app = new OpenAPIHono()

const route = createRoute({
  method: 'post',
  name: 'bookings',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            customer: z.object({ email: z.string(), name: z.string() }),
            date: z.coerce.date(),
            flightNumber: z.number(),
            passengers: z.array(
              z.object(
                {
                  name: z.string(),
                  passportNumber: z.string(),
                },
              ),
            ),
          }),
        },
      },
      description: 'registar a new booking',
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: z.object({
            bookingId: z.string(),
          }),
        },
      },
      description: 'Success',
    },
  },
})
app.openapi(route, async (c) => {
  Logger.error(`Calling route ${route.name}`)
  const uc = container.resolve(MakeBooking)
  const input = await c.req.json()
  const output = await uc.execute(input)

  return c.json(output, 201)
})

export default app
