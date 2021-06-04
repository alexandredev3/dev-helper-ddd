import { getCustomRepository } from 'typeorm';

import { UserEmail } from '@modules/users/domain/UserEmail';
import { UserName } from '@modules/users/domain/UserName';

import { User } from '../../domain/User';
import { UserOrmRepository } from '../../infra/typeorm/repositories/UserOrmRepository';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  private ormRepository: UserOrmRepository;

  constructor() {
    this.ormRepository = getCustomRepository(UserOrmRepository);
  }

  public async create(user: User): Promise<User> {}

  public async findUserById(id: string): Promise<User> {}

  public async findUserByUsername(username: UserName): Promise<User> {}

  public async findUserByEmail(email: UserEmail): Promise<User> {}
}
