import { UserEntityType } from '../entity-type/user.entity-type';

export interface UserInformationDataType
  extends Pick<UserEntityType, 'userUUID' | 'userEmailId' | 'accessLevel'> {}
