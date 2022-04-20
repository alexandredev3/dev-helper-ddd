import { User } from '../domain/User';
import { UserEmail } from '../domain/User/Email';
import { Username } from '../domain/User/Username';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findUserById(id: string): Promise<User>;
  findUserByEmail(email: UserEmail | string): Promise<User | null>;
  findUserByUsername(username: Username | string): Promise<User>;
  exists(email: UserEmail): Promise<boolean>;
}
