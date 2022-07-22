import { IsEnum, IsNumber, IsString } from 'class-validator';
import { JWTTokenDataType, LocalLoginDataType } from '../../domain/type/message-type/auth.message-type';
import { grpcStatus, GrpcStatusData, GrpcStatusType } from '../../domain/type/message-type/response.message-type';


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