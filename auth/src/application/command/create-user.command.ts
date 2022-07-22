import { ICommand } from '@nestjs/cqrs';
import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';

export interface CreateUserCommandInterface extends Pick<UserEntityType,
  'userEmailId' | 'userPassword'> {}


export class CreateUserCommand implements ICommand{

  constructor( readonly createUserCommandDTO : CreateUserCommandInterface) {}

}