import { IMapper } from '@shared/infra/Mapper';

import { User } from '../domain/User';

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
}
