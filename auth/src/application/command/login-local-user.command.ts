import { ICommand } from '@nestjs/cqrs';
import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';

export interface loginLocalUserCommandInterface extends Pick<UserEntityType,
  'userEmailId' | 'userPassword'> {}


export class loginLocalUserCommand implements ICommand{
  constructor( readonly loginLocalUserCommandDTO : loginLocalUserCommandInterface) {}
}