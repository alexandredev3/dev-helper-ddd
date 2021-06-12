import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BaseController } from '@shared/infra/http/models/BaseController';
import { TextUtils } from '@shared/utils/TextUtils';

import { ICreateUserDTO, ICreateUserDTOResponse } from './CreateUserDTO';
import { CreateUserErrors } from './CreateUserErrors';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController extends BaseController {
  constructor() {
    super();
  }

  public async executeImpl(request: Request, response: Response): Promise<any> {
    let dto: ICreateUserDTO = request.body as unknown as ICreateUserDTO;

    dto = {
      name: TextUtils.sanitize(dto.name),
      username: TextUtils.sanitize(dto.username),
      email: TextUtils.sanitize(dto.email),
      password: TextUtils.sanitize(dto.password),
      tags: TextUtils.validateTags(dto.tags)
        ? dto.tags.map((tag) => {
            return TextUtils.sanitize(tag);
          })
        : '',
    } as ICreateUserDTO;

    try {
      const useCase = container.resolve(CreateUserUseCase);

      const result = await useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateUserErrors.EmailAlreadyExistsError:
            return this.conflict(response, error.errorValue().message);
          case CreateUserErrors.UsernameTakenError:
            return this.conflict(response, error.errorValue().message);
          case CreateUserErrors.DTOFailed:
            return this.clientError(response, error.errorValue().message);
          default:
            return this.fail(response, error.errorValue().message);
        }
      }

      return this.ok<ICreateUserDTOResponse>(response, result.value.getValue());
    } catch (error) {
      return this.fail(response, error);
    }
  }
}
