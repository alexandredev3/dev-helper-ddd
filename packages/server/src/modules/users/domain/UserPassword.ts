import * as bcrypt from 'bcryptjs';

import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { ValueObject } from '@shared/domain/ValueObject';

interface IUserPasswordProps {
  value: string;
  hashed: boolean;
}

export class UserPassword extends ValueObject<IUserPasswordProps> {
  public static minLength: number = 8;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: IUserPasswordProps) {
    super(props);
  }

  private static isAppropriateLength(password: string): boolean {
    return password.length >= this.minLength;
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;

    if (this.isAlreadyHashed()) {
      hashed = this.props.value;

      return this.bcryptCompare(plainTextPassword, hashed);
    }

    return this.props.value === plainTextPassword;
  }

  public isAlreadyHashed(): boolean {
    return this.props.hashed;
  }

  private bcryptCompare(
    plainText: string,
    passwordHashed: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, passwordHashed, (err, compareResut) => {
        if (err) {
          return reject(false);
        }

        return resolve(compareResut);
      });
    });
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve) => {
      const hashed = bcrypt.hash(password, 8);

      return resolve(hashed);
    });
  }

  public getHashedValue(): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      }

      return resolve(this.hashPassword(this.props.value));
    });
  }

  public static create(props: IUserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.againstNullOrUndefined(props.value, 'password');

    if (!propsResult.succeeded) {
      return Result.fail<UserPassword>(propsResult.message);
    }

    if (!props.hashed && !this.isAppropriateLength(props.value)) {
      return Result.fail<UserPassword>(
        'Password doesn`t meet criteria [8 chars min]'
      );
    }

    return Result.ok(
      new UserPassword({
        value: props.value,
        hashed: !!props.hashed,
      })
    );
  }
}
