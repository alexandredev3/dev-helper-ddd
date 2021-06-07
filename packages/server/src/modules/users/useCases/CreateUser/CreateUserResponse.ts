import { AppError } from '@shared/core/AppError';
import { Either, Result } from '@shared/core/Result';

import { CreateUserErrors } from './CreateUserErrors';

/**
 * Left: Errors;
 * Right: Success;
 */
export type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
