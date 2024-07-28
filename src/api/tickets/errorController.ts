import AsyncController from '../../infrastructure/base/api/asyncController'
import Logger from '../../infrastructure/log/logger'
import Message from '../../infrastructure/messaging/message'

export default class ErrorController implements AsyncController {
  topic = process.env.TOPIC_BOOKINGS!

  async handle(receivedMessage: Message): Promise<void> {
    Logger.debug('ErrorController async controller received message', receivedMessage)

    throw new Error('ErrorController Error!')
  }
}
