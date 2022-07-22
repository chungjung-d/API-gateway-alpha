import { UserEntityType } from '../type/entity-type/user.entity-type';


export interface UserSaveType extends Pick<UserEntityType, 'userPassword'|'userEmailId'>{}

export interface UserRepositoryInterface {
  createUser: (userSaveDTO : UserSaveType) => Promise<void>
  findByUUID : (userUUID : string) => Promise<UserEntityType | null>
  findById : (userEmailId : string) => Promise<UserEntityType | null>
  findAll : () => Promise<UserEntityType[]>;
}