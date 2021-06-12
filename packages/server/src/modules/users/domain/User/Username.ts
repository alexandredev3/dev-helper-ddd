import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { ValueObject } from '@shared/domain/ValueObject';

interface IUsernameProps {
  value: string;
}

export class Username extends ValueObject<IUsernameProps> {
  get value(): string {
    return this.props.value;
  }

  constructor(props: IUsernameProps) {
    super(props);
  }

  private static format(value: string) {
    const valueFormated = value.trim().toLowerCase();

    return valueFormated;
  }

  public static create(props: IUsernameProps): Result<Username> {
    const nickNameResult = Guard.againstNullOrUndefined(
      props.value,
      'nickName'
    );

    if (!nickNameResult.succeeded) {
      return Result.fail<Username>(nickNameResult.message);
    }

    const nickName = this.format(props.value);

    return Result.ok<Username>(
      new Username({
        value: nickName,
      })
    );
  }
}
