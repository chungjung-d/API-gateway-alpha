import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JWTTokenDataType } from '../../domain/type/message-type/auth.command.message-type';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import {
  ReissueAccessJwtCommand,
  ReissueAccessJwtCommandReturn,
} from '../command/reissue-access-jwt.command';
import * as jwt from 'jsonwebtoken';

@Injectable()
@CommandHandler(ReissueAccessJwtCommand)
export class ReissueAccessJwtHandler
  implements
    ICommandHandler<ReissueAccessJwtCommand, ReissueAccessJwtCommandReturn>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    command: ReissueAccessJwtCommand,
  ): Promise<ReissueAccessJwtCommandReturn> {
    const { refreshToken } = command.reissueAccessJwtCommandDTO;

    const verify = jwt.verify(
      refreshToken,
      this.configService.get('JWT_REFRESH_SECRET'),
    );

    const accessGenerateJWTTokenDTO = {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expireTime: this.configService.get('JWT_ACCESS_EXPIRE_TIME'),
    };

    const user = await this.userRepository.findById(verify.sub);
    const accessToken = await user.createAccessJWTToken(
      accessGenerateJWTTokenDTO,
    );

    return { accessToken: accessToken };
  }
}
