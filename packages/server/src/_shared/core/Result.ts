interface IResultProps<T> {
  isSuccess: boolean;
  error?: T | string;
  value?: T;
}

export class Result<T> {
  public isSuccess: boolean;

  public isFailure: boolean;

  public error?: T | string;

  private _value?: T;

  public constructor({ isSuccess, error, value }: IResultProps<T>) {
    if (isSuccess && error) {
      throw new Error(
        '[InvalidOperation]: A result cannot be successful and contain an Error'
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        '[InvalidOperation]: A failing result needs to contain an error message'
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess || !this._value) {
      console.log(this.error);
      throw new Error(
        'Cannot get the value of an error result. Use `errorValue` instead.'
      );
    }

    return this._value;
  }

  public errorValue(): T | string {
    if (!this.isFailure || !this.error) {
      throw new Error(
        'Cannot get the error of a successe result. Use `getValue` instead.'
      );
    }

    return this.error;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>({
      isSuccess: true,
      value,
    });
  }

  public static fail<U>(error?: string): Result<U> {
    return new Result<U>({
      isSuccess: false,
      error,
    });
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }

    return Result.ok();
  }
}
