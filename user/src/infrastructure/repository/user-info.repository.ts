import { Injectable } from '@nestjs/common';
import { UserInfoRepositoryInterface } from '../../domin/interface/repository.interface';
import { DataSource, EntityManager } from 'typeorm';
import {
  UserInfoClass,
  UserInfoFactory,
} from '../../domin/interface/user-info.class';

@Injectable()
export class UserInfoRepository implements UserInfoRepositoryInterface {
  constructor(
    private dataSource: DataSource,
    private readonly userInfoFactory: UserInfoFactory,
  ) {}

  createUserInfo(
    new_user_info: UserInfoClass,
    transactionalEntityManager: EntityManager,
  ): Promise<void> {
    return Promise.resolve(undefined);
  }

  findAll(transactionalEntityManager: EntityManager): Promise<UserInfoClass[]> {
    return Promise.resolve([]);
  }

  findByUUID(
    userUUID: string,
    transactionalEntityManager: EntityManager,
  ): Promise<UserInfoClass | null> {
    return Promise.resolve(undefined);
  }

  updateUserInfo(
    new_user_info: UserInfoClass,
    transactionalEntityManager: EntityManager,
  ): Promise<void> {
    return Promise.resolve(undefined);
  }
}
