import { ICommand } from '@nestjs/cqrs';
import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';

export interface LoginLocalUserCommandInterface
  extends Pick<UserEntityType, 'userEmailId' | 'userPassword'> {}

export class LoginLocalUserCommand implements ICommand {
  constructor(
    readonly loginLocalUserCommandDTO: LoginLocalUserCommandInterface,
  ) {}
}
