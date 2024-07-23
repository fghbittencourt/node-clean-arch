import AsyncController from '../../infrastructure/base/api/asyncController'
import Logger from '../../infrastructure/log/logger'
import Message from '../../infrastructure/messaging/message'

export default class SomethingController extends AsyncController {
  async handle(receivedMessage: Message): Promise<void> {
    Logger.info('SomethingController async controller received message', receivedMessage)
  }

  topic(): string {
    return process.env.TOPIC_BOOKINGS!
  }
}
