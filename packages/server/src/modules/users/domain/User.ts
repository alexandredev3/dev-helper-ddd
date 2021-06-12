import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { Entity } from '@shared/domain/Entity';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

import { UserBio } from './UserBio';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';
import { UserTags } from './UserTags';

interface IUserProps {
  name: UserName;
  username: UserName;
  password: UserPassword;
  // avatar?: UserAvatar; TODO: Create an AvatarEntity
  bio?: UserBio;
  email: UserEmail;
  tags: UserTags;
  isEmailVerified?: boolean;
  acessToken?: string;
  refreshToken?: string;
  isDeleted?: boolean;
  lastLogin?: Date;
}

// extends with aggregateRoot when implemented the DomainEvents.
export class User extends Entity<IUserProps> {
  get userId(): UserId {
    return UserId.create(this._id).getValue();
  }

  get name(): UserName {
    return this.props.name;
  }

  get username(): UserName {
    return this.props.username;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  // get avatar(): UserAvatar | undefined {
  //   return this.props.avatar;
  // }

  get email(): UserEmail {
    return this.props.email;
  }

  get tags(): UserTags {
    return this.props.tags;
  }

  get bio(): UserBio | undefined {
    return this.props.bio;
  }

  get isEmailVerified(): boolean {
    return !!this.props.isEmailVerified;
  }

  get acessToken(): string | undefined {
    return this.props.acessToken;
  }

  get refreshToken(): string | undefined {
    return this.props.refreshToken;
  }

  get isDeleted(): boolean {
    return !!this.props.isDeleted;
  }

  get lastLogin(): Date | undefined {
    return this.props.lastLogin;
  }

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
