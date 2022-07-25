import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createLocalUserCommand } from '../command/create-local-user.command';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
@CommandHandler(createLocalUserCommand)
export class createLocalUserHandler implements ICommandHandler<createLocalUserCommand,void> {
  constructor(private readonly userRepository : UserRepository) {}

  async execute(command : createLocalUserCommand) :Promise<void> {

    const salt = bcrypt.genSaltSync(10);
    const userHashPassword = bcrypt.hashSync(command.createLocalUserCommandDTO.userPassword, salt);

    const userSaveDTO = {userEmailId : command.createLocalUserCommandDTO.userEmailId, userPassword : userHashPassword}
    await this.userRepository.createLocalUser(userSaveDTO);
  }
}
