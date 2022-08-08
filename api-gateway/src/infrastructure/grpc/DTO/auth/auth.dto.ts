import { UserInformationDataType } from '../../../../domain/type/auth/message-type/auth.query.message-type';

import {
  JWTTokenDataType,
  LocalLoginDataType,
} from '../../../../domain/type/auth/message-type/auth.command.message-type';
import { IsEmail, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

export class LocalLoginDTO implements LocalLoginDataType {
  @IsString()
  userEmailId: string;

  @IsString()
  userPassword: string;
}

export class LocalRegisterDTO implements LocalLoginDataType {
  @IsString()
  userEmailId: string;

  @IsString()
  userPassword: string;
}

export class VerifyAccessJWTTokenDTO
  implements Pick<JWTTokenDataType, 'accessToken'>
{
  @IsString()
  accessToken: string;
}

export class ReissueAccessJWTTokenDTO
  implements Pick<JWTTokenDataType, 'refreshToken'>
{
  @IsString()
  refreshToken: string;
}

export class JWTTokenDTO implements JWTTokenDataType {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

export class UserInfoDTO implements UserInformationDataType {
  @IsEmail()
  userEmailId: string;

  @IsUUID()
  userUUID: string;

  @IsNumber()
  accessLevel: number;
}

export class AccessJWTTokenDTO
  implements Pick<JWTTokenDataType, 'accessToken'>
{
  @IsString()
  accessToken: string;
}
