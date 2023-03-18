export interface DatabaseConnection {
  connect(): Promise<void>;
}
