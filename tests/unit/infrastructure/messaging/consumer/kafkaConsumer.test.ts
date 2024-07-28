import { faker } from '@faker-js/faker'

import AsyncController from '../../../../../src/infrastructure/base/api/asyncController'
import KafkaConsumer from '../../../../../src/infrastructure/messaging/consumer/kafkaConsumer'
import mockedSender from '../sender/mockedSender'

jest.mock('kafkajs')

const testController = (): AsyncController => ({
  handle: jest.fn(),
  topic: faker.internet.domainWord(),
})

describe('PubSubConsumer Testing', () => {
  it('should start and stop properly', async () => {
    const opts = {
      brookers: ['localhost:19092'],
      clientId: faker.string.sample(),
      controllers: [testController()],
      groupId: faker.string.sample(),
      sender: mockedSender(),
      topics: ['topic1'],
    }
    const consumer = await KafkaConsumer.create(opts)

    await consumer.start()
    await consumer.stop()

    // expect(bStopped).toBeFalsy()
    // expect(bStarted).toBeTruthy()
    // expect(bStopped2).toBeFalsy()
  })
})
