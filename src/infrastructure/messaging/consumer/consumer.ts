export interface MessageData {
  attributes: number
  key: Buffer | null
  offset: string
  timestamp: string
  value: Buffer | null
}
export interface ConsumerEvents {
  messageProcessed: [MessageData];
  messageReceived: [MessageData];
  processingError: [Error, MessageData];
  startProcessingMessage: [number, MessageData],
  started: [];
  stopped: [];
  timeoutError: [Error, MessageData];
}

export default interface Consumer {
  addHandler<T extends keyof ConsumerEvents>(
    event: T,
    handler: { (...args: unknown[]): void }
  ): void;
  removeHandler<T extends keyof ConsumerEvents>(event: T): void;
  start(): Promise<void>;
  stop(): Promise<void>;
}
