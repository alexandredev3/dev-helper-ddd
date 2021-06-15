import { Redis as IORedisClient } from 'ioredis';

import { redis } from '@shared/infra/database/redis';

import { IRedisClient } from '../models/IRedisClient';

export class RedisClient implements IRedisClient {
  private client: IORedisClient;

  constructor() {
    this.client = redis;
  }

  public async set(key: string, value: string): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recovery<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  public async exists(key: string): Promise<boolean> {
    const exists = await this.client.exists(key);

    return exists === 1;
  }

  public async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async deleteAll(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
