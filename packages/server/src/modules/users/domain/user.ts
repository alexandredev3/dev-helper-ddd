import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { Entity } from '@shared/domain/Entity';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

import { UserName } from './UserName';

interface IUserProps {
  name: UserName;
  username: UserName;
  password: string;
  avatar_url?: string;
  bio?: string;
  email: string;
  tags: string[];
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
