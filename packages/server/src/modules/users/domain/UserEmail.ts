import { Result } from '@shared/core/Result';
import { ValueObject } from '@shared/domain/ValueObject';

interface IUserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<IUserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IUserEmailProps) {
    super(props);
  }

  private static isValidEmail(email: string): boolean {
    const regex =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);
  }

  private static format(email: string): string {
    const emailFormated = email.trim().toLowerCase();

    return emailFormated;
  }

  public static create(props: IUserEmailProps): Result<UserEmail> {
    const { value } = props;

    const isValidEmail = this.isValidEmail(value);

    if (!isValidEmail) {
      return Result.fail<UserEmail>('E-mail address is not valid');
    }

    return Result.ok<UserEmail>(
      new UserEmail({
        value: this.format(value),
      })
    );
  }
}
