import { injectable, inject } from 'tsyringe';

import { IRedisClient } from '@shared/infra/database/redis/models/IRedisClient';

import { IJWTAuthService } from '../models/IJWTAuthService';

@injectable()
export class JWTAuthService implements IJWTAuthService {
  private redisClient: IRedisClient;

  constructor(
    @inject('RedisClient')
    redisClient: IRedisClient
  ) {
    this.redisClient = redisClient;
  }
}
