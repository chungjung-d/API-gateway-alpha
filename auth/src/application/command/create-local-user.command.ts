import { ICommand } from '@nestjs/cqrs';
import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';

export interface createLocalUserCommandInterface extends Pick<UserEntityType,
  'userEmailId' | 'userPassword'> {}


export class createLocalUserCommand implements ICommand{

  constructor( readonly createLocalUserCommandDTO : createLocalUserCommandInterface) {}
}