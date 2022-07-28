import { IsEmail, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import {
  JWTTokenDataType,
  LocalLoginDataType,
} from '../../domain/type/message-type/auth.command.message-type';
import {
  grpcStatus,
  GrpcStatusData,
  GrpcStatusType,
} from '../../domain/type/message-type/response.message-type';
import { UserInformationDataType } from '../../domain/type/message-type/auth.query.message-type';

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

export class GrpcStatusDTO implements GrpcStatusData {
  @IsEnum(grpcStatus)
  grpcStatus: GrpcStatusType;
}

export class JWTTokenDTO implements JWTTokenDataType, GrpcStatusData {
  @IsEnum(grpcStatus)
  grpcStatus: GrpcStatusType;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

export class UserInfoDTO implements UserInformationDataType, GrpcStatusData {
  @IsEmail()
  userEmailId: string;

  @IsUUID()
  userUUID: string;

  @IsNumber()
  accessLevel: number;

  @IsEnum(grpcStatus)
  grpcStatus: GrpcStatusType;
}

export class AccessJWTTokenDTO
  implements Pick<JWTTokenDataType, 'accessToken'>, GrpcStatusData
{
  @IsString()
  accessToken: string;

  @IsEnum(grpcStatus)
  grpcStatus: GrpcStatusType;
}
