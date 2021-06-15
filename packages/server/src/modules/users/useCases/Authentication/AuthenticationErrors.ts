import { Result } from '@shared/core/Result';
import { UseCaseError } from '@shared/core/UseCaseError';

export namespace AuthenticationErrors {
  export class UserDoesNotExistsError extends Result<UseCaseError> {
    constructor() {
      super({
        isSuccess: false,
        error: {
          message: `User does not exists`,
        },
      });
    }
  }

  export class PasswordDoesntMatchError extends Result<UseCaseError> {
    constructor() {
      super({
        isSuccess: false,
        error: {
          message: `Password does not match.`,
        },
      });
    }
  }

  export class DTOFailed extends Result<UseCaseError> {
    constructor(error: string) {
      super({
        isSuccess: false,
        error: {
          message: error,
        },
      });
    }
  }
}
