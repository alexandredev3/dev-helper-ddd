import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { ValueObject } from '@shared/domain/ValueObject';

interface IUserBioProps {
  bio: string;
}

export class UserBio extends ValueObject<IUserBioProps> {
  private static minLength: number = 4;

  private static maxLength: number = 300;

  get value(): string {
    return this.props.bio;
  }

  private constructor(props: IUserBioProps) {
    super(props);
  }

  public static create({ bio }: IUserBioProps): Result<UserBio> {
    const bioResult = Guard.againstNullOrUndefined(bio, 'bio');

    if (!bioResult.succeeded) {
      return Result.fail<UserBio>(bioResult.message);
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, bio);

    if (!minLengthResult.succeeded) {
      return Result.fail<UserBio>(minLengthResult.message);
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, bio);

    if (!maxLengthResult.succeeded) {
      return Result.fail<UserBio>(maxLengthResult.message);
    }

    return Result.ok<UserBio>(
      new UserBio({
        bio,
      })
    );
  }
}
