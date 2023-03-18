export default interface App {
  readonly getApp: unknown;
  start(): Promise<void>;
}
