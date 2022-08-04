import {
  grpcStatus,
  GrpcStatusType,
} from '../../domin/type/message-type/response.message-type';
import { UserInfoEntityType } from '../../domin/type/entity-type/user-info.entity-type';
import { IsUUID } from 'class-validator';

export class CreateUserInfoDTO implements Pick<UserInfoEntityType, 'userUUID'> {
  @IsUUID()
  userUUID: string;
}
