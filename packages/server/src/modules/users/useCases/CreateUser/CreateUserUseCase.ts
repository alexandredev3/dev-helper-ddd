import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/domain/User';
import { UserEmail } from '@modules/users/domain/UserEmail';
import { UserName } from '@modules/users/domain/UserName';
import { UserPassword } from '@modules/users/domain/UserPassword';
import { UserTags } from '@modules/users/domain/UserTags';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { AppError } from '@shared/core/AppError';
import { left, Result, right } from '@shared/core/Result';
import { IUseCase } from '@shared/core/UseCase';

import { ICreateUserDTO, ICreateUserDTOResponse } from './CreateUserDTO';
import { CreateUserErrors } from './CreateUserErrors';
import { Response } from './CreateUserResponse';

@injectable()
export class CreateUserUseCase implements IUseCase<ICreateUserDTO, Response> {
  private userRepository: IUserRepository;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository
  ) {
    this.userRepository = userRepository;
  }

  public async execute(request: ICreateUserDTO): Promise<Response> {
    let user: User;

    const nameOrError = UserName.create({
      name: request.name,
    });
    const nickOrError = UserName.create({
      name: request.username,
    });
    const emailOrError = UserEmail.create({
      value: request.email,
    });
    const passwordOrError = UserPassword.create({
      value: request.password,
    });
    const tagsOrError = UserTags.create({
      tags: request.tags,
    });

    const DTOResult = Result.combine([
      nameOrError,
      nickOrError,
      emailOrError,
      passwordOrError,
      tagsOrError,
    ]);

    if (DTOResult.isFailure) {
      return left(new CreateUserErrors.DTOFailed(DTOResult.errorValue()));
    }

    const name = nameOrError.getValue();
    const email = emailOrError.getValue();
    const password = passwordOrError.getValue();
    const nickname = nickOrError.getValue();
    const tags = tagsOrError.getValue();

    try {
      const userAlreadyExists = await this.userRepository.exists(email);

      if (userAlreadyExists) {
        return left(new CreateUserErrors.EmailAlreadyExistsError(email.value));
      }

      try {
        const alreadyCreatedUserByNickname =
          await this.userRepository.findUserByUsername(nickname);

        if (alreadyCreatedUserByNickname) {
          return left(new CreateUserErrors.UsernameTakenError(nickname.value));
        }
      } catch (error) {}

      const userOrError = User.create({
        name,
        email,
        password,
        username: nickname,
        tags,
      });

      if (userOrError.isFailure) {
        return left(Result.fail<void>(userOrError.error?.toString()));
      }

      try {
        user = await this.userRepository.create(userOrError.getValue());
      } catch (error) {
        return left(new AppError.UnexpectedError(error));
      }

      return right(
        Result.ok<ICreateUserDTOResponse>({
          id: user.userId.id.toValue(),
          name: user.name.value,
          username: user.username.value,
        })
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
