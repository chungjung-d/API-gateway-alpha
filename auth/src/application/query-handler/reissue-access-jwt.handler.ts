import { Injectable } from '@nestjs/common';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../infrastructure/repository/user.repository';

import * as jwt from 'jsonwebtoken';
import {
  ReissueAccessJwtQuery,
  ReissueAccessJwtQueryReturn,
} from '../query/reissue-access-jwt.query';

@Injectable()
@QueryHandler(ReissueAccessJwtQuery)
export class ReissueAccessJwtHandler
  implements
    ICommandHandler<ReissueAccessJwtQuery, ReissueAccessJwtQueryReturn>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    query: ReissueAccessJwtQuery,
  ): Promise<ReissueAccessJwtQueryReturn> {
    const { refreshToken } = query.reissueAccessJwtQueryDTO;

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
