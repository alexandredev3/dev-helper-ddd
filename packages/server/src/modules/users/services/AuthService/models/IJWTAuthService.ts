import { User } from '@modules/users/domain/User';

import { JWTToken, IJWTClaims, RefreshToken } from '../../../domain/User/JWT';

export interface IJWTAuthService {
  sign(props: IJWTClaims): JWTToken;
  decode(token: string): Promise<IJWTClaims>;
  constructKey(username: string, refreshToken: RefreshToken): string;
  addToken(
    username: string,
    refreshToken: RefreshToken,
    token: JWTToken
  ): Promise<void>;
  createRefreshToken(): RefreshToken;
  clearAllToken(): Promise<any>;
  countSessions(username: string): Promise<number>;
  clearAllSessions(username: string): Promise<void>;
  sessionExists(username: string, refreshToken: RefreshToken): Promise<boolean>;
  countTokens(): Promise<number>;
  getToken(
    username: string,
    refreshToken: RefreshToken
  ): Promise<string | null>;
  getTokens(username: string): Promise<string[]>;
  clearToken(username: string, refreshToken: string): Promise<void>;
  saveAuthenticatedUser(user: User): Promise<void>;
}
