import { faker } from '@faker-js/faker'
import { KafkaMessage } from 'kafkajs'

import AsyncController from '../../../../../src/infrastructure/base/api/asyncController'
import kafkaMessageProcessor from '../../../../../src/infrastructure/messaging/consumer/kafkaMessageProcessor'
import mockedSender from '../sender/mockedSender'

const mockedAsyncController = () : AsyncController => ({
  handle: jest.fn(),
  topic: faker.string.alpha(),
})

const mockedKafkaMessage = (value : unknown) : KafkaMessage => ({
  attributes: faker.number.int(),
  headers: undefined,
  key: null,
  offset: faker.number.int().toString(),
  size: 0,
  timestamp: faker.date.soon().toString(),
  value: Buffer.from(JSON.stringify(value)),
})

describe('kafkaMessageProcessor Testing', () => {
  it('Should process a message', async () => {
    const sender = mockedSender()
    const controller = mockedAsyncController()
    const message = { id: 1 }
    const cloudEventMessage = { data: message }
    const retries = 2
    const topic = faker.string.alpha()

    await kafkaMessageProcessor(
      mockedKafkaMessage(cloudEventMessage),
      retries,
      controller,
      sender,
      topic,
    )

    expect(sender.sendRaw).not.toHaveBeenCalled()
    expect(controller.handle).toHaveBeenCalledWith(message)
  })
})
