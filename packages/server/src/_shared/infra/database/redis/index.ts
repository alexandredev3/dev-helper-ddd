import Redis from 'ioredis';

import RedisConfig from '@config/redis';

export const redis = new Redis(RedisConfig.options);
