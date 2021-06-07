import { getCustomRepository } from 'typeorm';

import { UserEmail } from '@modules/users/domain/UserEmail';
import { UserName } from '@modules/users/domain/UserName';
import { UserMap } from '@modules/users/mappers/userMap';

import { User } from '../../domain/User';
import { TypeormUserRepository } from '../../infra/typeorm/repositories/TypeormUserRepository';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  private ormRepository: TypeormUserRepository;

  constructor() {
    this.ormRepository = getCustomRepository(TypeormUserRepository);
  }

  public async create(user: User): Promise<User | null> {
    const userExists = await this.exists(user.email);

    if (userExists) {
      throw new Error('User already exists.');
    }

    const rawUser = await UserMap.toPersistence(user);

    const userCreated = this.ormRepository.create(rawUser);

    await this.ormRepository.save(userCreated);

    return UserMap.toDomain(userCreated);
  }

  public async findUserById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOne(id);

    if (!user) {
      throw new Error('User does not exists');
    }

    return UserMap.toDomain(user);
  }

  public async findUserByUsername(
    username: UserName | string
  ): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: {
        username: username instanceof UserName ? username.value : username,
      },
    });

    if (!user) {
      throw new Error('User does not exists');
    }

    return UserMap.toDomain(user);
  }

  public async exists(email: UserEmail): Promise<boolean> {
    const user = await this.ormRepository.findOne({
      where: {
        email: email.value,
      },
    });

    return !!user;
  }
}
