import { RedisOptions } from 'ioredis';

import { REDIS_HOST, REDIS_PORT } from '@dev-helper/environment';

interface IRedisOptions {
  driver: string;
  options: RedisOptions;
}

export default {
  driver: 'redis',
  options: { host: REDIS_HOST, port: REDIS_PORT },
} as IRedisOptions;
