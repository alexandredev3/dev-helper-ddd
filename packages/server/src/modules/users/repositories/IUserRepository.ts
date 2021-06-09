import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserName } from '../domain/UserName';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findUserById(id: string): Promise<User>;
  exists(email: UserEmail): Promise<boolean>;
  findUserByUsername(username: UserName | string): Promise<User>;
}
