import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { container } from 'tsyringe'
import { z } from 'zod'

import App from '../infrastructure/base/api/app'
import Logger from '../infrastructure/log/logger'
import bootstrapper from './bootstrapper'

export default class HonoApp implements App {
  server: unknown

  start = async (): Promise<void> => {
    await bootstrapper(container)

    const app = new OpenAPIHono()
    this.server = app

    // example route
    const testRoute = createRoute({
      method: 'post',
      path: '/test',
      request: {
        body: {
          content: {
            'application/json': {
              schema: z.object({
                fullName: z.string().openapi({ example: 'João Cardoso' }),
              }),
            },
          },
          description: 'my method description',
        },
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: z.object({
                hello: z.string(),
              }),
            },
          },
          description: 'say hello',
        },
      },
    })
    app.openapi(testRoute, async (c) => {
      const body = await c.req.json()
      Logger.debug(body)
      return c.json({ hello: body.fullName }, 200)
    })

    // The openapi.json will be available at /doc
    app.doc('/docs/json', {
      info: {
        title: 'My API',
        version: '1.0.0',
      },
      openapi: '3.0.0',
    })
    app.get('/docs', swaggerUI({ url: '/docs/json' }))

    const port = 4500
    Logger.info(`Hono Server is running on port ${port}`)

    serve({
      fetch: app.fetch,
      port,
    })
  }

  ready(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
