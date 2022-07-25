import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createLocalUserCommand } from '../command/create-local-user.command';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { loginLocalUserCommand } from '../command/login-local-user.command';
import { JWTTokenDataType } from '../../domain/type/message-type/auth.message-type';

@Injectable()
@CommandHandler(loginLocalUserCommand)
export class loginLocalUserHandler implements ICommandHandler<loginLocalUserCommand,JWTTokenDataType> {

  async execute(command : loginLocalUserCommand) :Promise<JWTTokenDataType> {

    return {accessToken:"dewdwe", refreshToken:"dsfsfds"}
  }
}
