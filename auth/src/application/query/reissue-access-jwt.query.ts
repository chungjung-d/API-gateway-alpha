import { IQuery } from '@nestjs/cqrs';
import { JWTTokenDataType } from '../../domain/type/message-type/auth.command.message-type';

export interface ReissueAccessJwtQueryDataType
  extends Pick<JWTTokenDataType, 'refreshToken'> {}

export interface ReissueAccessJwtQueryReturn
  extends Pick<JWTTokenDataType, 'accessToken'> {}

export class ReissueAccessJwtQuery implements IQuery {
  constructor(
    readonly reissueAccessJwtQueryDTO: ReissueAccessJwtQueryDataType,
  ) {}
}
