import { Inject, Injectable } from '@nestjs/common';
import { UserClass, UserFactory } from '../../domain/interface/user.class';
import { DataSource, Repository } from 'typeorm';
import { UserRepositoryInterface } from '../../domain/interface/repostory.interface';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    private dataSource: DataSource,
    private readonly userFactory: UserFactory,
  ) {}

  async createUser(new_user: UserClass): Promise<void> {
    const userRepository = this.dataSource.getRepository(User);

    const user_entity = this.classToEntity(new_user);
    await userRepository.save(user_entity);
  }

  async updateUser(user: UserClass): Promise<void> {
    const userRepository = this.dataSource.getRepository(User);
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

  findAll(): Promise<UserClass[]> {
    return Promise.resolve([]);
  }

  async findById(userEmailId: string): Promise<UserClass> {
    const userRepository = this.dataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        userEmailId: userEmailId,
      },
    });
    const user_class = await this.entityToClass(user);
    return user_class;
  }

  async findByUUID(userUUID: string): Promise<UserClass | null> {
    const userRepository = this.dataSource.getRepository(User);
    return Promise.resolve(undefined);
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
