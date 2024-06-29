export default interface App {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  server: any;
  start(): Promise<void>;
}
