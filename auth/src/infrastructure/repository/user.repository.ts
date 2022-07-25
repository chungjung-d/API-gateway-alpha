import { UserRepositoryInterface, UserSaveType } from '../../domain/interface/repostory.interface';
import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';
import { CustomRepository } from './typeorm-ex.decorator';
import { User } from '../entity/user.entity';
import { DataSource, EntityManager, EntityMetadata, Repository } from 'typeorm';
import { UserClass, UserFactory } from '../../domain/interface/user.class';
import { raw } from 'express';
import { Inject } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { CustomTypeOrmModule } from './typeorm-ex.module';


@CustomRepository(User)
export class UserRepository extends Repository<User> implements UserRepositoryInterface{

  constructor(@Inject(UserFactory) private readonly userFactory:UserFactory,
              entityManager : EntityManager,
  ) {
    const constructorValue = entityManager.getRepository(User)
    super(constructorValue.target,constructorValue.manager,constructorValue.queryRunner);
  }

  async createLocalUser(userSaveDTO: UserSaveType): Promise<void> {
    const new_user = new User()
    const {userPassword , userEmailId} = userSaveDTO;
    new_user.userEmailId = userEmailId;
    new_user.userPassword = userPassword;

    await this.save(new_user);
  }

  findAll(): Promise<UserClass[]> {
    return Promise.resolve([]);
  }

  async findById(userEmailId: string): Promise<UserClass> {

    return Promise.resolve(undefined);
  }

  findByUUID(userUUID: string): Promise<UserClass | null> {
    return Promise.resolve(undefined);
  }

  private classToEntity(_class: UserClass): User {
    const properties = _class.properties();
    return {
      ...properties,
    }
  }

  private entityToClass(entity: User): UserClass {
    return this.userFactory.reconstitute({
      ...entity
    })
  }

}