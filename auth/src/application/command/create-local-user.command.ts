import { ICommand } from '@nestjs/cqrs';
import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';

export interface CreateLocalUserCommandInterface
  extends Pick<UserEntityType, 'userEmailId' | 'userPassword'> {}

export class CreateLocalUserCommand implements ICommand {
  constructor(
    readonly createLocalUserCommandDTO: CreateLocalUserCommandInterface,
  ) {}
}
