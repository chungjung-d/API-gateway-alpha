import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createLocalUserCommand } from '../command/create-local-user.command';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { loginLocalUserCommand } from '../command/login-local-user.command';
import { JWTTokenDataType } from '../../domain/type/message-type/auth.message-type';
import { UserFactory } from '../../domain/interface/user.class';
import { ConfigService } from '@nestjs/config';

@Injectable()
@CommandHandler(loginLocalUserCommand)
export class loginLocalUserHandler implements ICommandHandler<loginLocalUserCommand,JWTTokenDataType> {

  constructor(
    private readonly configService : ConfigService,
    private readonly userRepository : UserRepository,
    ) {}

  async execute(command : loginLocalUserCommand) :Promise<JWTTokenDataType> {

    const {userPassword , userEmailId} = command.loginLocalUserCommandDTO
    const user =  await this.userRepository.findById(userEmailId);

    const isPasswordValidate : boolean = await user.comparePassword(userPassword);
    // isPassowrdValidate 추가

    const accessGenerateJWTTokenDTO = {
      secret : this.configService.get('JWT_ACCESS_SECRET'),
      expireTime : this.configService.get('JWT_ACCESS_EXPIRE_TIME')
    }

    const refreshGenerateJWTTokenDTO = {
      secret : this.configService.get('JWT_REFRESH_SECRET'),
      expireTime : this.configService.get('JWT_REFRESH_EXPIRE_TIME')
    }

    const accessToken : string = await user.createAccessJWTToken(accessGenerateJWTTokenDTO);
    const refreshToken : string = await user.createRefreshJWTToken(refreshGenerateJWTTokenDTO);

    return {accessToken:accessToken, refreshToken:refreshToken}
  }
}
