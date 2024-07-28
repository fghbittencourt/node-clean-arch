import AsyncController from '../../infrastructure/base/api/asyncController'
import Logger from '../../infrastructure/log/logger'
import Message from '../../infrastructure/messaging/message'

export default class EmitTicketsController implements AsyncController {
  topic = process.env.TOPIC_EMIT_TICKETS!

  async handle(receivedMessage: Message): Promise<void> {
    Logger.debug('EmitTicketsController async controller received message', receivedMessage)
  }
}
