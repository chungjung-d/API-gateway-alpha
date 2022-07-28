import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VerifyAccessJWTTokenQuery } from '../query/verify-access-jwt.query';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { UserInformationDataType } from '../../domain/type/message-type/auth.query.message-type';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@QueryHandler(VerifyAccessJWTTokenQuery)
export class VerifyAccessJWTTokenHandler
  implements IQueryHandler<VerifyAccessJWTTokenQuery>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    query: VerifyAccessJWTTokenQuery,
  ): Promise<UserInformationDataType> {
    const { accessToken } = query.VerifyAccessJWTTokenQueryDTO;
    const verify = jwt.verify(
      accessToken,
      this.configService.get('JWT_ACCESS_SECRET'),
    );

    const user = await this.userRepository.findById(verify.sub);
    const UserInformationDTO = user.getUserInfo();
    return UserInformationDTO;
  }
}
