import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { JWTAuthService } from '@modules/users/services/AuthService/Implementations/JWTAuthService';

import { BaseMiddleware } from '../models/BaseMiddleware';

export class EnsureAuthenticated extends BaseMiddleware {
  public ensureAuthenticated() {
    const jwtAuthService = container.resolve(JWTAuthService);

    return async (request: Request, response: Response, next: NextFunction) => {
      const token = request.headers.authorization || '';

      if (!token) {
        return this.endRequest(401, 'No access token provided', response);
      }

      const decoded = await jwtAuthService.decode(token);

      if (!decoded) {
        return this.endRequest(403, 'Token signature expired', response);
      }

      const { username } = decoded;
      const tokens = await jwtAuthService.getTokens(username);

      if (tokens.length === 0) {
        return this.endRequest(
          403,
          'Auth token not found. User is probably not logged in. try again...',
          response
        );
      }

      request.decoded = decoded;

      return next();
    };
  }
}
