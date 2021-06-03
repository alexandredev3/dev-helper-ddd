import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { Entity } from '@shared/domain/Entity';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

import { UserAvatar } from './UserAvatar';
import { UserBio } from './UserBio';
import { UserEmail } from './UserEmail';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';
import { UserTags } from './UserTags';

interface IUserProps {
  name: UserName;
  username: UserName;
  password: UserPassword;
  avatar_url?: UserAvatar;
  bio?: UserBio;
  email: UserEmail;
  tags: UserTags;
  isEmailVerified?: boolean;
  acessToken: string;
  refreshToken: string;
  isDeleted?: boolean;
  lastLogin?: Date;
}

// extends with aggregateRoot when implemented the DomainEvents.
export class User extends Entity<IUserProps> {
  private constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IUserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: 'username' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.tags, argumentName: 'tags' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    }

    // if not have a id in first time. Its because is a new user.
    // const isNewUser = !!id === false; TODO

    const user = new User(
      {
        ...props,
        isDeleted: props.isDeleted ? props.isDeleted : false,
        isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
      },
      id
    );

    // [DomainEvent]: UserCreated TODO.
    // if (isNewUser) {
    //  ...
    // }

    return Result.ok<User>(user);
  }
}
