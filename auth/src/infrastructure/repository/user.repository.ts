import { Inject } from '@nestjs/common';
import { UserClass, UserFactory } from '../../domain/interface/user.class';
import { EntityManager, Repository } from 'typeorm';
import { UserRepositoryInterface } from '../../domain/interface/repostory.interface';
import { CustomRepository } from './typeorm-ex.decorator';
import { User } from '../entity/user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> implements UserRepositoryInterface{

  constructor( private readonly userFactory : UserFactory,
              entityManager : EntityManager,
  ) {
    const constructorValue = entityManager.getRepository(User)
    super(constructorValue.target,constructorValue.manager,constructorValue.queryRunner);
  }

  async createUser(new_user : UserClass): Promise<void> {
    const user_entity = this.classToEntity(new_user);
    await this.save(user_entity);
  }

  async updateUser(user : UserClass): Promise<void> {
    const user_entity = this.classToEntity(user);

    await this.update({
      userUUID : user_entity.userUUID,
    },{
      ...user_entity
      }
    )
  }

  findAll(): Promise<UserClass[]> {
    return Promise.resolve([]);
  }

  async findById(userEmailId: string): Promise<UserClass> {
    const user = await this.findOne({where:{
      userEmailId : userEmailId
      }})
    const user_class = await this.entityToClass(user);
    return user_class;
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

    return new UserClass(entity);
  }

}