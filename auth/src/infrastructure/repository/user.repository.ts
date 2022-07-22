import { UserRepositoryInterface, UserSaveType } from '../../domain/interface/repostory.interface';
import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';
import { CustomRepository } from './typeorm-ex.decorator';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';


@CustomRepository(User)
export class UserRepository extends Repository<User> implements UserRepositoryInterface{

  async createUser(userSaveDTO: UserSaveType): Promise<void> {
    const new_user = new User()
    const {userPassword , userEmailId} = userSaveDTO;
    new_user.userEmailId = userEmailId;
    new_user.userPassword = userPassword;

    await this.save(new_user);
  }

  findAll(): Promise<UserEntityType[]> {
    return Promise.resolve([]);
  }

  findById(userEmailId: string): Promise<UserEntityType | null> {
    return Promise.resolve(undefined);
  }

  findByUUID(userUUID: string): Promise<UserEntityType | null> {
    return Promise.resolve(undefined);
  }

}