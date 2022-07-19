import { IsEnum, IsNumber, IsString } from 'class-validator';
import { JWTTokenDataType, LocalLoginDataType } from '../type/message-type/auth.message-type';
import { grpcStatus, GrpcStatusData, GrpcStatusType } from '../type/message-type/response.message-type';
import exp from 'constants';


export class LocalLoginDTO implements LocalLoginDataType{
  @IsString()
  userEmailId: string;

  @IsString()
  userPassword: string;
}

export class LocalRegisterDTO implements LocalLoginDataType{
  @IsString()
  userEmailId: string;

  @IsString()
  userPassword: string;
}

export class JWTTokenDTO implements JWTTokenDataType , GrpcStatusData{

  @IsEnum(grpcStatus)
  grpcStatus : GrpcStatusType;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

export class GrpcStatusDTO implements GrpcStatusData{
  @IsEnum(grpcStatus)
  grpcStatus : GrpcStatusType;
}