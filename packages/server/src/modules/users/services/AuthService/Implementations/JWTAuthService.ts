import jwt from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import { config, IAuthConfig } from '@config/auth';
import { IJWTClaims, JWTToken } from '@modules/users/domain/User/JWT';
import { IRedisClient } from '@shared/services/RedisClientService/models/IRedisClient';

import { IJWTAuthService } from '../models/IJWTAuthService';

@injectable()
export class JWTAuthService implements IJWTAuthService {
  private redisClientService: IRedisClient;

  private authConfig: IAuthConfig;

  constructor(
    @inject('RedisClientService')
    redisClientService: IRedisClient
  ) {
    this.redisClientService = redisClientService;
    this.authConfig = config;
  }

  public sign(props: IJWTClaims): JWTToken {
    const claims: IJWTClaims = {
      userId: props.userId,
      username: props.username,
      isEmailVerified: props.isEmailVerified,
    };

    const token = jwt.sign(claims, this.authConfig.secret.private_key, {
      expiresIn: this.authConfig.expiresIn,
    });

    return token;
  }

  public decode(token: JWTToken): Promise<IJWTClaims> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.authConfig.secret.public_key, (err, decoded) => {
        if (err) return reject(err);

        return resolve(decoded as IJWTClaims);
      });
    });
  }
}
