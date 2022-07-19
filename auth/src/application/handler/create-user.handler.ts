import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../command/create-user.command';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand,void> {
  constructor() {}

  async execute(command : CreateUserCommand) :Promise<void> {
    await console.log(command.createUserCommandDTO)

  }
}
