import { UserEntityType } from '../entity-type/user.entity-type';
import { JWTTokenDataType } from './auth.command.message-type';

export interface UserInformationDataType
  extends Pick<UserEntityType, 'userUUID' | 'userEmailId' | 'accessLevel'> {}
