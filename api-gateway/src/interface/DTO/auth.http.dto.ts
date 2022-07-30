import { UserInformationDataType } from '../../domain/type/auth/message-type/auth.query.message-type';
import { IsEmail, IsNumber, IsString, IsUUID } from 'class-validator';
import {
  LocalLoginDTO,
  LocalRegisterDTO,
} from '../../infrastructure/grpc/DTO/auth/auth.dto';
import { JWTTokenDataType } from '../../domain/type/auth/message-type/auth.command.message-type';

export class LocalLoginHttpDTO extends LocalLoginDTO {}

export class LocalRegisterHttpDTO extends LocalRegisterDTO {}

export class JWTTokenHttpDTO implements JWTTokenDataType {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

export class AccessJWTTokenHttpDTO
  implements Pick<JWTTokenDataType, 'accessToken'>
{
  @IsString()
  accessToken: string;
}

export class UserInfoHttpDTO implements UserInformationDataType {
  @IsEmail()
  userEmailId: string;

  @IsUUID()
  userUUID: string;

  @IsNumber()
  accessLevel: number;
}
