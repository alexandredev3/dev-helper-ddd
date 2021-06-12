import { getCustomRepository } from 'typeorm';

import { UserEmail } from '@modules/users/domain/User/Email';
import { Username } from '@modules/users/domain/User/Username';
import { UserMap } from '@modules/users/mappers/userMap';

import { User } from '../../domain/User';
import { User as UserPersistence } from '../../infra/typeorm/entities/User';
import { TypeormUserRepository } from '../../infra/typeorm/repositories/TypeormUserRepository';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  private ormRepository: TypeormUserRepository;

  constructor() {
    this.ormRepository = getCustomRepository(TypeormUserRepository);
  }

  public async create(user: User): Promise<User> {
    const rawUser = await UserMap.toPersistence(user);

    const userCreated = this.ormRepository.create(
      rawUser
    ) as unknown as UserPersistence;

    await this.ormRepository.save(userCreated);

    return UserMap.toDomain(userCreated);
  }

  public async findUserById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    return UserMap.toDomain(user);
  }

  public async findUserByUsername(username: Username | string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: {
        username: username instanceof Username ? username.value : username,
      },
    });

    if (!user) {
      throw new Error('User not found');
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
