import { IMapper } from '@shared/infra/Mapper';

import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';
import { UserTags } from '../domain/UserTags';

export class UserMap implements IMapper<User> {
  public static async toPersistence(user: User): Promise<any> {
    let password: string | null = null;

    if (user.password) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      }

      password = await user.password.getHashedValue();
    }

    return {
      id: user.userId.id.toValue(),
      name: user.username.value,
      encrypted_password: password,
      bio: user.bio?.value,
      email: user.email.value,
      tags: user.tags,
      is_email_verified: user.isEmailVerified,
      is_deleted: user.isDeleted,
    };
  }

  public static toDomain(raw: any): User | null {
    const userNameOrError = UserName.create({
      name: raw.name,
    });
    const userNickNameOrError = UserName.create({
      name: raw.username,
    });
    const userPasswordOrError = UserPassword.create({
      value: raw.encrypted_password,
      hashed: true,
    });
    const userEmailOrError = UserEmail.create({
      value: raw.email,
    });
    const userTagsOrError = UserTags.create({
      tags: raw.tags,
    });

    const userOrError = User.create({
      name: userNameOrError.getValue(),
      username: userNickNameOrError.getValue(),
      password: userPasswordOrError.getValue(),
      email: userEmailOrError.getValue(),
      tags: userTagsOrError.getValue(),
      isEmailVerified: raw.is_email_verified,
      isDeleted: raw.is_deleted,
    });

    if (userOrError.isFailure) {
      console.log(userOrError.error);
      return null;
    }

    if (userOrError.isSuccess) {
      return userOrError.getValue();
    }

    return null;
  }
}
