import { UserEntityType } from '../type/entity-type/user.entity-type';
import { UserClass } from './user.class';
import { User } from '../../infrastructure/entity/user.entity';



export interface UserSaveType extends Pick<UserEntityType, 'userPassword'|'userEmailId'>{}

export interface UserRepositoryInterface {
  createLocalUser: (userSaveDTO : UserSaveType) => Promise<void>
  findByUUID : (userUUID : string) => Promise<UserClass | null>
  findById : (userEmailId: string) => Promise<User>
  findAll : () => Promise<UserClass[]>;

}