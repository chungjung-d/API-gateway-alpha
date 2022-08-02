import { UserClass } from './user.class';
import { EntityManager } from 'typeorm';

export interface UserRepositoryInterface {
  createUser: (
    new_user: UserClass,
    transactionalEntityManager: EntityManager,
  ) => Promise<void>;
  updateUser: (
    user: UserClass,
    transactionalEntityManager: EntityManager,
  ) => Promise<void>;
  findByUUID: (
    userUUID: string,
    transactionalEntityManager: EntityManager,
  ) => Promise<UserClass | null>;
  findById: (
    userEmailId: string,
    transactionalEntityManager: EntityManager,
  ) => Promise<UserClass>;
  findAll: (transactionalEntityManager: EntityManager) => Promise<UserClass[]>;
}
