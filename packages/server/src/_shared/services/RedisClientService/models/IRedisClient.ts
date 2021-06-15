export interface IRedisClient {
  set(key: string, value: any): Promise<void>;
  delete(key: string): Promise<void>;
  deleteAll(prefix: string): Promise<void>;
  recovery<T>(key: string): Promise<T | null>;
  exists(key: string): Promise<boolean>;
}
