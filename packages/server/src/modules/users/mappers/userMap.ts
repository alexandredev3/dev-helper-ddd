import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import { IMapper } from '@shared/infra/Mapper';

import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';
import { UserTags } from '../domain/UserTags';
import { User as UserPersistence } from '../infra/typeorm/entities/User';

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
      name: user.name.value,
      username: user.username.value,
      encrypted_password: password,
      bio: user.bio?.value,
      email: user.email.value,
      tags: user.tags.tagsRaw,
      is_email_verified: user.isEmailVerified,
      is_deleted: user.isDeleted,
    };
  }

  public static toDomain(raw: UserPersistence): User {
    const userName = UserName.create({
      name: raw.name,
    });
    const userNickName = UserName.create({
      name: raw.username,
    });
    const userPassword = UserPassword.create({
      value: raw.encrypted_password,
      hashed: true,
    });
    const userEmail = UserEmail.create({
      value: raw.email,
    });
    const userTags = UserTags.createRaw({
      tagsRaw: raw.tags,
    });

    const user = User.create(
      {
        name: userName.getValue(),
        username: userNickName.getValue(),
        password: userPassword.getValue(),
        email: userEmail.getValue(),
        tags: userTags.getValue(),
        isEmailVerified: raw.is_email_verified,
        isDeleted: raw.is_deleted,
      },
      new UniqueEntityID(raw.id)
    );

    if (user.isFailure) {
      console.log(user.errorValue());
      throw new Error(user.errorValue().toString());
    }

    return user.getValue();
  }
}
