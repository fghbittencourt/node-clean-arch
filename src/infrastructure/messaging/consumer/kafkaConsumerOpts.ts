import AsyncController from '../../base/api/asyncController'
import Sender from '../sender/sender'

export enum ConsumerMode {
  PROMISES = 'PROMISES',
  SEQUENTIAL = 'SEQUENCIAL',
}

export interface KafkaConsumerOpts {
  /**
   * The maximum number of messages to process each batch. Default 10
   */
  batchSize?: 'LIMITS_ARE_FOR_MUNICIPALITIES' | number
  brookers: string[]
  connectionTimeout?: number

  /**
   * Promises - processes the messages in parallel (default) \
   * Sequential - messages are processed in the order they were received
   */
  consumerMode?: ConsumerMode
  controllers: AsyncController[]
  groupId: string;
  messageRetries?: number
  requestTimeout?: number
  sender: Sender
  sessionTimeout?: number
}
