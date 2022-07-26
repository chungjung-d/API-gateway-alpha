import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createLocalUserCommand } from '../command/create-local-user.command';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { UserFactory } from '../../domain/interface/user.class';

@Injectable()
@CommandHandler(createLocalUserCommand)
export class createLocalUserHandler implements ICommandHandler<createLocalUserCommand,void> {
  constructor(private readonly userRepository : UserRepository,
              @Inject(UserFactory) private readonly userFactory: UserFactory,) {}

  async execute(command : createLocalUserCommand) :Promise<void> {

    const salt = bcrypt.genSaltSync(10);
    const userHashPassword = bcrypt.hashSync(command.createLocalUserCommandDTO.userPassword, salt);

    const new_user = this.userFactory.create(command.createLocalUserCommandDTO.userEmailId ,userHashPassword);
    await this.userRepository.createLocalUser(new_user);
  }
}
