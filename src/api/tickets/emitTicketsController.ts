import AsyncController from '../../infrastructure/base/api/asyncController'
import Logger from '../../infrastructure/log/logger'
import Message from '../../infrastructure/messaging/message'

export default class EmitTicketsController extends AsyncController {
  async handle(receivedMessage: Message): Promise<void> {
    Logger.info('EmitTicketsController async controller received message', receivedMessage)
  }

  topic(): string {
    return process.env.TOPIC_EMIT_TICKETS!
  }
}
