export interface MessageData {
  data?: string | Uint8Array | null;
  attributes?: { [k: string]: string } | null;
  messageId?: string | null;
}

export interface ReceivedMessage {
  ackId?: string | null;
  message?: MessageData | null;
}

export interface PullResponse {
  receivedMessages?: ReceivedMessage[] | null;
}

export interface ConsumerEvents {
  responseProcessed: [PullResponse];
  empty: [];
  started: [];
  stopped: [];
  messageReceived: [ReceivedMessage];
  messageProcessed: [ReceivedMessage];
  pullingError: [Error];
  timeoutError: [Error, ReceivedMessage];
  processingError: [Error, ReceivedMessage];
  deletingError: [Error, ReceivedMessage];
}

export default interface Consumer {
  start(): Promise<void>;
  stop(): Promise<void>;
  get isRunning(): boolean;
  addHandler<T extends keyof ConsumerEvents>(
    event: T,
    handler: { (...args: unknown[]): void }
  ): void;
  removeHandler<T extends keyof ConsumerEvents>(event: T): void;
}
