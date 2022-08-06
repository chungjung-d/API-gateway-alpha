import { Injectable } from '@nestjs/common';
import { UserInfoRepositoryInterface } from '../../domin/interface/repository.interface';
import { DataSource, EntityManager } from 'typeorm';
import {
  UserInfoClass,
  UserInfoFactory,
} from '../../domin/interface/user-info.class';
import { UserInfo } from '../entity/user-info.entity';

@Injectable()
export class UserInfoRepository implements UserInfoRepositoryInterface {
  constructor(
    private dataSource: DataSource,
    private readonly userInfoFactory: UserInfoFactory,
  ) {}

  async createUserInfo(
    new_user_info: UserInfoClass,
    transactionalEntityManager: EntityManager,
  ): Promise<void> {
    const userInfoRepository =
      transactionalEntityManager.getRepository(UserInfo);
    const user_info_entity = this.classToEntity(new_user_info);
    await userInfoRepository.save(user_info_entity);
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

  private classToEntity(_class: UserInfoClass): UserInfo {
    const properties = _class.properties();
    return {
      ...properties,
    };
  }

  private entityToClass(entity: UserInfo): UserInfoClass {
    return this.userInfoFactory.reconstitute(entity);
  }
}
