export interface IJWTClaims {
  userId: string;
  username: string;
  isEmailVerified: boolean;
}

export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;
