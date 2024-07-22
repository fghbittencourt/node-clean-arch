import * as dotenv from 'dotenv'
import http, { IncomingMessage, ServerResponse } from 'http'

import Logger from '../../infrastructure/log/logger'

dotenv.config()

const port = process.env.ASYNC_HC_PORT
const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200)
  res.end('healthy')
}
const server = http.createServer(requestListener)
server.listen(port, async () => {
  Logger.debug(
    `Health Check of ${process.env.APP_NAME} worker is listening on ${port}`,
  )
})
