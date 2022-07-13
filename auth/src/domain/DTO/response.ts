import { JWTTokenDataType } from '../type/response';
import { IsString } from 'class-validator';

export class JWTTokenDTO implements JWTTokenDataType{
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}