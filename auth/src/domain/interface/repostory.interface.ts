import { UserClass } from './user.class';

export interface UserRepositoryInterface {
  createUser: (new_user : UserClass) => Promise<void>
  updateUser: (user : UserClass) => Promise<void>
  findByUUID : (userUUID : string) => Promise<UserClass | null>
  findById : (userEmailId: string) => Promise<UserClass>
  findAll : () => Promise<UserClass[]>;
}