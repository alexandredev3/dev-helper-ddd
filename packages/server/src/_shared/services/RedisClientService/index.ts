import { container } from 'tsyringe';

import { RedisClient } from './implementations/RedisClient';
import { IRedisClient } from './models/IRedisClient';

container.registerSingleton<IRedisClient>('RedisClientService', RedisClient);
