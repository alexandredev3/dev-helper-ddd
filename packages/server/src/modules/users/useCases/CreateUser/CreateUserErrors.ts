import { Result } from '@shared/core/Result';
import { UseCaseError } from '@shared/core/UseCaseError';

export namespace CreateUserErrors {
  export class EmailAlreadyExistsError extends Result<UseCaseError> {
    constructor(email: string) {
      super({
        isSuccess: false,
        error: {
          message: `The email ${email} associated for this account already exists`,
        },
      });
    }
  }

  export class UsernameTakenError extends Result<UseCaseError> {
    constructor(username: string) {
      super({
        isSuccess: false,
        error: {
          message: `The username ${username} was already taken`,
        },
      });
    }
  }
}
