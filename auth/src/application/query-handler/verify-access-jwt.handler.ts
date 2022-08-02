import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VerifyAccessJWTTokenQuery } from '../query/verify-access-jwt.query';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { UserInformationDataType } from '../../domain/type/message-type/auth.query.message-type';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { DataSource, EntityManager } from 'typeorm';

@QueryHandler(VerifyAccessJWTTokenQuery)
export class VerifyAccessJWTTokenHandler
  implements IQueryHandler<VerifyAccessJWTTokenQuery>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  async execute(
    query: VerifyAccessJWTTokenQuery,
  ): Promise<UserInformationDataType> {
    return await this.transactionCommit(query);
  }

  async transactionCommit(
    query: VerifyAccessJWTTokenQuery,
  ): Promise<UserInformationDataType> {
    return await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const { accessToken } = query.VerifyAccessJWTTokenQueryDTO;
        const verify = jwt.verify(
          accessToken,
          this.configService.get('JWT_ACCESS_SECRET'),
        );

        const user = await this.userRepository.findById(
          verify.sub,
          transactionalEntityManager,
        );
        const UserInformationDTO = user.getUserInfo();
        return UserInformationDTO;
      },
    );
  }
}
