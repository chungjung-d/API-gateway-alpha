import { EntityManager } from 'typeorm';
import { UserInfoClass } from './user-info.class';

export interface UserInfoRepositoryInterface {
  createUserInfo: (
    new_user_info: UserInfoClass,
    transactionalEntityManager: EntityManager,
  ) => Promise<void>;
  updateUserInfo: (
    new_user_info: UserInfoClass,
    transactionalEntityManager: EntityManager,
  ) => Promise<void>;

  deleteUserInfo: (
    userUUID: string,
    transactionalEntityManager: EntityManager,
  ) => Promise<void>;

  findByUUID: (
    userUUID: string,
    transactionalEntityManager: EntityManager,
  ) => Promise<UserInfoClass | null>;
  findAll: (
    transactionalEntityManager: EntityManager,
  ) => Promise<UserInfoClass[]>;
}
