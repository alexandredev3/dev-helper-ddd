import { Response } from 'express';
import { container } from 'tsyringe';

import { IDecodedExpressRequest } from '@modules/users/infra/http/models/decodedRequest';
import { BaseController } from '@shared/infra/http/models/BaseController';
import { TextUtils } from '@shared/utils/TextUtils';

import {
  IAuthenticationDTO,
  IAuthenticationDTOResponse,
} from './AuthenticationDTO';
import { AuthenticationErrors } from './AuthenticationErrors';
import { AuthenticationUseCase } from './AuthenticationUseCase';

export class AuthenticationController extends BaseController {
  constructor() {
    super();
  }

  public async executeImpl(
    request: IDecodedExpressRequest,
    response: Response
  ): Promise<any> {
    let dto: IAuthenticationDTO = request.body as IAuthenticationDTO;

    dto = {
      email: TextUtils.sanitize(dto.email),
      password: TextUtils.sanitize(dto.password),
    } as IAuthenticationDTO;

    try {
      const useCase = container.resolve(AuthenticationUseCase);

      const result = await useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case AuthenticationErrors.DTOFailed:
            return this.clientError(response, error.errorValue().message);
          case AuthenticationErrors.UserDoesNotExistsError:
            return this.notFound(response, error.errorValue().message);
          case AuthenticationErrors.PasswordDoesntMatchError:
            return this.clientError(response, error.errorValue().message);
          default:
            return this.fail(response, error.errorValue().message);
        }
      }

      return this.ok<IAuthenticationDTOResponse>(
        response,
        result.value.getValue()
      );
    } catch (error) {
      return this.fail(response, error);
    }
  }
}
