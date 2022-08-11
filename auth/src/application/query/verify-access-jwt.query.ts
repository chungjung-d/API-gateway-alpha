import { IQuery } from '@nestjs/cqrs';
import { JWTTokenDataType } from '../../domain/type/message-type/auth.command.message-type';

export interface VerifyAccessJWTTokenQueryType
  extends Pick<JWTTokenDataType, 'accessToken'> {}

export class VerifyAccessJWTTokenQuery implements IQuery {
  constructor(
    readonly VerifyAccessJWTTokenQueryDTO: VerifyAccessJWTTokenQueryType,
  ) {}
}
