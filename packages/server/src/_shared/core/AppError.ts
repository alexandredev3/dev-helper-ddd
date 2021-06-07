import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(error: any) {
      super({
        isSuccess: false,
        error: {
          message: `An unexpected error occured`,
        },
      });

      console.log('[AppError]: An unexpected Error occurred');
      console.error(error);
    }

    public static create(error: any): UnexpectedError {
      return new UnexpectedError(error);
    }
  }
}
