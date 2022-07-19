import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand, CreateUserCommandInterface } from '../command/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand,void> {
  constructor() {}

  async execute(command : CreateUserCommand) {
    await console.log(command);
  }
}
