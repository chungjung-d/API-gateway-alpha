import { ICommand } from '@nestjs/cqrs';
import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';
import { JWTTokenDataType } from '../../domain/type/message-type/auth.command.message-type';

export interface ReissueAccessJwtCommandInterface
  extends Pick<JWTTokenDataType, 'refreshToken'> {}

export interface ReissueAccessJwtCommandReturn
  extends Pick<JWTTokenDataType, 'accessToken'> {}

export class ReissueAccessJwtCommand implements ICommand {
  constructor(
    readonly reissueAccessJwtCommandDTO: ReissueAccessJwtCommandInterface,
  ) {}
}
