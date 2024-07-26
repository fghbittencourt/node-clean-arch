// import { faker } from '@faker-js/faker'

// import AsyncController from '../../../../../src/infrastructure/base/api/asyncController'
// import KafkaConsumer from '../../../../../src/infrastructure/messaging/consumer/kafkaConsumer'

// jest.mock('kafkajs')

// describe('PubSubConsumer Testing', () => {
//   it('should start and stop properly', async () => {
//     const opts = {
//       brookers: [faker.internet.url()],
//       controllers: jest.fn() as unknown as AsyncController[],
//       groupId: faker.string.sample(),
//       topics: ['topic1'],
//     }
//     const consumer = await KafkaConsumer.create(opts)

//     consumer.consumer = jest.fn()

//     const bStopped = consumer.isRunning
//     await consumer.start()
//     const bStarted = consumer.isRunning
//     await consumer.stop()
//     const bStopped2 = consumer.isRunning

//     expect(bStopped).toBeFalsy()
//     expect(bStarted).toBeTruthy()
//     expect(bStopped2).toBeFalsy()
//   })
// })
