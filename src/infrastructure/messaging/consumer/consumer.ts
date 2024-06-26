export interface MessageData {
  attributes?: { [k: string]: string } | null;
  data?: Uint8Array | null | string;
  messageId?: null | string;
}

export interface ReceivedMessage {
  ackId?: null | string;
  message?: MessageData | null;
}

export interface PullResponse {
  receivedMessages?: ReceivedMessage[] | null;
}

export interface ConsumerEvents {
  deletingError: [Error, ReceivedMessage];
  empty: [];
  messageProcessed: [ReceivedMessage];
  messageReceived: [ReceivedMessage];
  processingError: [Error, ReceivedMessage];
  pullingError: [Error];
  responseProcessed: [PullResponse];
  started: [];
  stopped: [];
  timeoutError: [Error, ReceivedMessage];
}

export default interface Consumer {
  addHandler<T extends keyof ConsumerEvents>(
    event: T,
    handler: { (...args: unknown[]): void }
  ): void;
  get isRunning(): boolean;
  removeHandler<T extends keyof ConsumerEvents>(event: T): void;
  start(): Promise<void>;
  stop(): Promise<void>;
}
