import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { ValueObject } from '@shared/domain/ValueObject';

interface IUserAvatarProps {
  avatar_url: string;
}

// TODO: file size validation.
export class UserAvatar extends ValueObject<IUserAvatarProps> {
  get value(): string | undefined {
    return this.props.avatar_url;
  }

  private constructor(props: IUserAvatarProps) {
    super(props);
  }

  public static create(props: IUserAvatarProps): Result<UserAvatar> {
    const avatarResult = Guard.againstNullOrUndefined(
      props.avatar_url,
      'avatar_url'
    );

    if (!avatarResult.succeeded) {
      return Result.fail<UserAvatar>(avatarResult.message);
    }

    return Result.ok<UserAvatar>(new UserAvatar(props));
  }
}
