import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../command/create-user.command';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand,void> {
  constructor(private readonly userRepository : UserRepository) {}

  async execute(command : CreateUserCommand) :Promise<void> {

    const salt = bcrypt.genSaltSync(10);
    const userHashPassword = bcrypt.hashSync(command.createUserCommandDTO.userPassword, salt);

    const userSaveDTO = {userEmailId : command.createUserCommandDTO.userEmailId, userPassword : userHashPassword}
    await this.userRepository.createUser(userSaveDTO);

  }
}
