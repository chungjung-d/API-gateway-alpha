import { Inject, Injectable } from '@nestjs/common';
import { UserClass, UserFactory } from '../../domain/interface/user.class';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserRepositoryInterface } from '../../domain/interface/repostory.interface';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly userFactory: UserFactory) {}

  async createUser(
    new_user: UserClass,
    transactionalEntityManager: EntityManager,
  ): Promise<void> {
    const userRepository = transactionalEntityManager.getRepository(User);

    const user_entity = this.classToEntity(new_user);
    await userRepository.save(user_entity);
  }

  async updateUser(
    user: UserClass,
    transactionalEntityManager: EntityManager,
  ): Promise<void> {
    const userRepository = transactionalEntityManager.getRepository(User);
    const user_entity = this.classToEntity(user);

    await userRepository.update(
      {
        userUUID: user_entity.userUUID,
      },
      {
        ...user_entity,
      },
    );
  }

  findAll(transactionalEntityManager: EntityManager): Promise<UserClass[]> {
    return Promise.resolve([]);
  }

  async findById(
    userEmailId: string,
    transactionalEntityManager: EntityManager,
  ): Promise<UserClass> {
    const userRepository = transactionalEntityManager.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        userEmailId: userEmailId,
      },
    });
    const user_class = await this.entityToClass(user);
    return user_class;
  }

  async findByUUID(
    userUUID: string,
    transactionalEntityManager: EntityManager,
  ): Promise<UserClass | null> {
    const userRepository = transactionalEntityManager.getRepository(User);
    return Promise.resolve(undefined);
  }

  async deleteUser(
    userUUID: string,
    transactionalEntityManager: EntityManager,
  ): Promise<void> {
    const userRepository = transactionalEntityManager.getRepository(User);
    await userRepository.delete({ userUUID: userUUID });
  }

  private classToEntity(_class: UserClass): User {
    const properties = _class.properties();
    return {
      ...properties,
    };
  }

  private entityToClass(entity: User): UserClass {
    return this.userFactory.reconstitute(entity);
  }
}
