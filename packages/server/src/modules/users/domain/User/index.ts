import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

import { UserCreated } from '../events/User/UserCreated';
import { UserSession } from '../events/User/UserSession';
import { UserBio } from './Bio';
import { UserEmail } from './Email';
import { UserId } from './Id';
import { JWTToken, RefreshToken } from './JWT';
import { UserName } from './Name';
import { UserPassword } from './Password';
import { UserTags } from './Tags';
import { Username } from './Username';

interface IUserProps {
  name: UserName;
  username: Username;
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

export class User extends AggregateRoot<IUserProps> {
  get userId(): UserId {
    return UserId.create(this._id).getValue();
  }

  get name(): UserName {
    return this.props.name;
  }

  get username(): Username {
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

  public isAuthenticated(): boolean {
    const isAuthenticated =
      !!this.props.acessToken && !!this.props.refreshToken;

    return isAuthenticated;
  }

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    this.addDomainEvent(new UserSession(this));
    this.props.acessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
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

    // not have a id is a new user.
    const isNewUser = !id;

    const user = new User(
      {
        ...props,
        isDeleted: props.isDeleted ? props.isDeleted : false,
        isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
      },
      id
    );

    if (isNewUser) {
      user.addDomainEvent(new UserCreated(user));
    }

    return Result.ok<User>(user);
  }
}
