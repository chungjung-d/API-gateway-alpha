import { ICommand } from '@nestjs/cqrs';
import { AuthEntityType } from '../../domain/type/entity-type/auth.entity-type';

export interface CreateUserCommandInterface extends Pick<AuthEntityType,
  'userEmailId' | 'userPassword'> {}


export class CreateUserCommand implements ICommand{

  constructor( readonly createUserCommandDTO : CreateUserCommandInterface) {}

}