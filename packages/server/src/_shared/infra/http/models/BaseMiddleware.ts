import { Response } from 'express';

export class BaseMiddleware {
  protected endRequest(
    status: 400 | 401 | 403,
    message: string,
    response: Response
  ): Response<string, Record<string, any>> {
    return response.status(status).send({
      message,
    });
  }
}
