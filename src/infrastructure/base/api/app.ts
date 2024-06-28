export default interface App {
  ready(): Promise<void>;
  server: unknown;
  start(): Promise<void>;
}
