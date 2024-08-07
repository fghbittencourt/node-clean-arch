import { KafkaMessage } from 'kafkajs'
import promiseRetry from 'promise-retry'

import AsyncController from '../../base/api/asyncController'
import Logger from '../../log/logger'
import Sender from '../sender/sender'

export default async (
  kafkaMessage : KafkaMessage,
  retries : number,
  controller : AsyncController,
  sender : Sender,
  topic : string,
) => {
  if (!kafkaMessage.value) return

  const content = Buffer.from(kafkaMessage.value)
  const jsonString = content.toString('utf-8')
  const rawMessage = JSON.parse(jsonString)

  // TODO put some logic to convert to defined message formats based on the payload
  const messageData = rawMessage.data // here I'm assuming it's a CloudEvent

  await promiseRetry(async (retry, number) => {
    Logger.debug(`KafkaMessageProcessor - Consuming message. Attempt no.${number}`, messageData)
    try {
      await controller.handle(messageData)
      Logger.debug(`KafkaMessageProcessor - Message processed. Attempt no.${number}`, messageData)
    } catch (error) {
      Logger.warn(`KafkaMessageProcessor - Error trying to consume message. Attempt no.${number}`, messageData)
      retry(error)
    }
  }, { retries }).catch(async () => {
    const dlqTopic = `${topic}.DLQ`
    await sender.sendRaw(rawMessage, dlqTopic)
    Logger.error(`Message from ${topic} has been put on DLQ. Offset: ${kafkaMessage.offset}.`)
  })
}
