import { injectable, inject, container } from 'tsyringe';

import { User } from '@modules/users/domain/User';
import { UserEmail } from '@modules/users/domain/User/Email';
import { UserPassword } from '@modules/users/domain/User/Password';
import { AppError } from '@shared/core/AppError';
import { left, Result, right } from '@shared/core/Result';
import { IUseCase } from '@shared/core/UseCase';

import { IUserRepository } from '../../repositories/IUserRepository';
import { JWTAuthService } from '../../services/AuthService/Implementations/JWTAuthService';
import {
  IAuthenticationDTO,
  IAuthenticationDTOResponse,
} from './AuthenticationDTO';
import { AuthenticationErrors } from './AuthenticationErrors';
import { Response } from './AuthenticationResponse';

@injectable()
export class AuthenticationUseCase
  implements IUseCase<IAuthenticationDTO, Response>
{
  private userRepository;

  private jwtAuthService: JWTAuthService;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository
  ) {
    this.jwtAuthService = container.resolve(JWTAuthService);
    this.userRepository = userRepository;
  }

  public async execute(request: IAuthenticationDTO): Promise<Response> {
    let user: User;
    let email: UserEmail;
    let password: UserPassword;

    try {
      const emailOrError = UserEmail.create({
        value: request.email,
      });
      const passwordOrError = UserPassword.create({
        value: request.password,
      });

      const result = Result.combine([emailOrError, passwordOrError]);

      if (result.isFailure) {
        return left(new AuthenticationErrors.DTOFailed(result.errorValue()));
      }

      email = emailOrError.getValue();
      password = passwordOrError.getValue();

      user = await this.userRepository.findUserByEmail(email);

      if (!user) {
        return left(new AuthenticationErrors.UserDoesNotExistsError());
      }

      const passwordValid = await password.comparePassword(password.value);

      if (!passwordValid) {
        return left(new AuthenticationErrors.PasswordDoesntMatchError());
      }

      const accessToken = this.jwtAuthService.sign({
        isEmailVerified: user.isEmailVerified,
        userId: user.userId.id.toString(),
        username: user.username.value,
      });

      user.setAccessToken(accessToken);

      // jwtAuthService: save Authenticated User TODO;

      return right(
        Result.ok<IAuthenticationDTOResponse>({
          accessToken,
        })
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
}