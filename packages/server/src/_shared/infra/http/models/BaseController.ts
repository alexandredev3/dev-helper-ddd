import { Request, Response } from 'express';

export abstract class BaseController {
  protected abstract executeImpl(
    request: Request,
    response: Response
  ): Promise<void | any>;

  public async execute(request: Request, response: Response): Promise<void> {
    try {
      await this.executeImpl(request, response);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);
      this.fail(response, err);
    }
  }

  public static jsonResponse(
    response: Response,
    code: number,
    message?: string
  ): Response {
    return response.status(code).json({
      message,
    });
  }

  public fail(response: Response, error: Error | string): Response {
    console.log(error);

    return response.status(500).json({
      message: error,
    });
  }

  public conflict(response: Response, message?: string): Response {
    return BaseController.jsonResponse(response, 409, message || 'Conflict');
  }

  public clientError(response: Response, message?: string): Response {
    return BaseController.jsonResponse(
      response,
      400,
      message || 'Client error'
    );
  }

  public ok<T>(response: Response, dto?: T): Response {
    if (dto) {
      response.type('appliction/json');
      return response.status(200).json(dto);
    }

    return response.sendStatus(204);
  }
}
