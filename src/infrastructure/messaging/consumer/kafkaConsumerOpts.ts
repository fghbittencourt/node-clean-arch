import AsyncController from '../../base/api/asyncController'
import KafkaSender from '../sender/kafkaSender'

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
  clientId: string;
  connectionTimeout?: number

  /**
   * Promises - processes the messages in parallel (default) \
   * Sequential - messages are processed in the order they were received
   */
  consumerMode?: ConsumerMode
  controllers: AsyncController[]
  groupId: string;
  minMessageRetries?: number
  requestTimeout?: number
  sender: KafkaSender
  sessionTimeout?: number
}
