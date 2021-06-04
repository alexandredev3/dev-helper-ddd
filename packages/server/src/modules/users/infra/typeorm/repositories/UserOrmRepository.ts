import { Repository, EntityRepository } from 'typeorm';

import { User } from '../entities/User';

@EntityRepository(User)
export class UserOrmRepository extends Repository<User> {}
