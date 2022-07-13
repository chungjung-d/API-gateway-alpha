import { IsString } from 'class-validator';
import { LocalLoginDataType } from '../type/request';

export class LocalLoginDTO implements LocalLoginDataType{
  @IsString()
  id: string;

  @IsString()
  password: string;
}