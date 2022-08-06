import { IsUUID } from 'class-validator';
import { UserInfoEntityType } from '../../../../domain/type/user/entity-type/user-info.entity-type';

export class CreateUserInfoDTO implements Pick<UserInfoEntityType, 'userUUID'> {
  @IsUUID()
  userUUID: string;
}
