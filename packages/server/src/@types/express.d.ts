declare module Express {
  interface IJWTClaims {
    userId: string;
    username: string;
    isEmailVerified: boolean;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Request {
    decoded: IJWTClaims;
  }
}
