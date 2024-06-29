import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { container } from 'tsyringe'

import App from '../infrastructure/base/api/app'
import Logger from '../infrastructure/log/logger'
import bookingRoute from './booking/bookingRoute'
import bootstrapper from './bootstrapper'

export default class HonoApp implements App {
  server: unknown

  start = async (): Promise<void> => {
    await bootstrapper(container)

    const app = new OpenAPIHono()
    this.server = app

    app.route('/booking', bookingRoute) // <- add imported route here

    app.notFound((c) => c.text('Not found 🙁'))
    app.doc('/docs/json', {
      info: {
        title: 'OpenAPI Hono 🚀',
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
