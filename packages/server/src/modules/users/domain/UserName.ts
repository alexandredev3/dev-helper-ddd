import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { ValueObject } from '@shared/domain/ValueObject';

interface IUserNameProps {
  name: string;
}

// TODO: Create a separate entity for the user nickname.
export class UserName extends ValueObject<IUserNameProps> {
  public static maxLength: number = 28;

  public static minLength: number = 5;

  get value(): string {
    return this.props.name;
  }

  private constructor(props: IUserNameProps) {
    super(props);
  }

  public static create(props: IUserNameProps): Result<UserName> {
    const usernameResult = Guard.againstNullOrUndefined(props.name, 'name');

    if (!usernameResult.succeeded) {
      return Result.fail<UserName>(usernameResult.message);
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);

    if (!minLengthResult.succeeded) {
      return Result.fail<UserName>(minLengthResult.message);
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);

    if (!maxLengthResult.succeeded) {
      return Result.fail<UserName>(maxLengthResult.message);
    }

    return Result.ok<UserName>(new UserName(props));
  }
}
