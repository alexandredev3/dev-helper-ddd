import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import { injectable, inject } from 'tsyringe';

import { config, IAuthConfig } from '@config/auth';
import {
  IJWTClaims,
  JWTToken,
  RefreshToken,
} from '@modules/users/domain/User/JWT';
import { IRedisClient } from '@shared/services/RedisClientService/models/IRedisClient';

import { IJWTAuthService } from '../models/IJWTAuthService';

@injectable()
export class JWTAuthService implements IJWTAuthService {
  private redisClientService: IRedisClient;

  private authConfig: IAuthConfig;

  private hash: string = 'jwtActiveClients';

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

  public createRefreshToken(): RefreshToken {
    const refreshToken = randtoken.uid(256);

    return refreshToken;
  }

  public constructKey(username: string, refreshToken: string): string {
    return `refresh-${refreshToken}.${this.hash}.${username}`;
  }

  public async addToken(
    username: string,
    refreshToken: RefreshToken,
    token: JWTToken
  ): Promise<void> {
    const key = this.constructKey(username, refreshToken);

    await this.redisClientService.set(key, token);
  }

  public async getToken(
    username: string,
    refreshToken: string
  ): Promise<string | null> {
    const key = this.constructKey(username, refreshToken);

    const token = await this.redisClientService.recovery<string>(key);

    return token;
  }

  public async getTokens(username: string): Promise<string[]> {
    const values = await this.redisClientService.recoveryMany<string>(
      `*${this.hash}.${username}`
    );

    return values;
  }
}
