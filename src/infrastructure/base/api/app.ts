export default interface App {
  ready(): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  server: any;
  start(): Promise<void>;
}
