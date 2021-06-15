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
  clearAllToken(): Promise<any>;
  countSessions(username: string): Promise<number>;
  clearAllSessions(username: string): Promise<void>;
  sessionExists(username: string, refreshToken: RefreshToken): Promise<boolean>;
  countTokens(): Promise<number>;
  getToken(username: string, refreshToken: RefreshToken): Promise<string>;
  getTokens(username: string): Promise<string[]>;
  clearToken(username: string, refreshToken: string): Promise<void>;
}
