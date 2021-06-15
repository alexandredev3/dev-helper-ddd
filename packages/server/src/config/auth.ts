import { Algorithm } from 'jsonwebtoken';

import { PUBLIC_KEY, PRIVATE_KEY } from '@dev-helper/environment';

export interface IAuthConfig {
  expiresIn: string;
  algorithm: Algorithm;
  secret: {
    private_key: string;
    public_key: string;
  };
}

export const config: IAuthConfig = {
  expiresIn: '15m',
  algorithm: 'RS256',
  secret: {
    private_key: PRIVATE_KEY,
    public_key: PUBLIC_KEY,
  },
} as IAuthConfig;
