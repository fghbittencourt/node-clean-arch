import AsyncController from '../../infrastructure/base/api/asyncController'
import Logger from '../../infrastructure/log/logger'
import Message from '../../infrastructure/messaging/message'

export default class ErrorController extends AsyncController {
  async handle(receivedMessage: Message): Promise<void> {
    Logger.info('ErrorController async controller received message', receivedMessage)

    throw new Error('ErrorController Error!')
  }

  topic(): string {
    return process.env.TOPIC_BOOKINGS!
  }
}
