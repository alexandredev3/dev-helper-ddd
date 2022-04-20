interface IResultProps<T> {
  isSuccess: boolean;
  error?: T;
  value?: T;
}

export class Result<T> {
  public isSuccess: boolean;

  public isFailure: boolean;

  public error: T | null;

  private _value: T | null;

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
    this.error = error || null;
    this._value = value || null;

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

  public errorValue(): T {
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

  public static fail<U>(error: any): Result<U> {
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

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right(a);
};
