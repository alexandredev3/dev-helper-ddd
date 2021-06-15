import { AppError } from '@shared/core/AppError';
import { Either, Result } from '@shared/core/Result';

import { IAuthenticationDTOResponse } from './AuthenticationDTO';
import { AuthenticationErrors } from './AuthenticationErrors';

export type Response = Either<
  | AuthenticationErrors.UserDoesNotExistsError
  | AuthenticationErrors.PasswordDoesntMatchError
  | AuthenticationErrors.DTOFailed
  | AppError.UnexpectedError,
  Result<IAuthenticationDTOResponse>
>;
