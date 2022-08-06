import { ICommand } from '@nestjs/cqrs';
import { UserInfoEntityType } from '../../domin/type/entity-type/user-info.entity-type';

export interface CreateUserInfoCommandInterface
  extends Pick<UserInfoEntityType, 'userUUID'> {}

export class CreateUserInfoCommand implements ICommand {
  constructor(
    readonly createUserInfoCommandDTO: CreateUserInfoCommandInterface,
  ) {}
}
