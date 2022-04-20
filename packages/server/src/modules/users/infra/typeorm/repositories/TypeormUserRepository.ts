import { Repository, EntityRepository } from 'typeorm';

import { User } from '../entities/User';

@EntityRepository(User)
export class TypeormUserRepository extends Repository<User> {}
