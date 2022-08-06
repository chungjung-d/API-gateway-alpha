import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserInfoCommand } from '../command/create-user-info.command';
import { DataSource, EntityManager } from 'typeorm';
import { UserInfoFactory } from '../../domin/interface/user-info.class';
import { UserInfoRepository } from '../../infrastructure/repository/user-info.repository';

@Injectable()
@CommandHandler(CreateUserInfoCommand)
export class CreateUserInfoHandler
  implements ICommandHandler<CreateUserInfoCommand, void>
{
  constructor(
    private readonly dataSource: DataSource,
    private readonly userInfoRepository: UserInfoRepository,
    @Inject(UserInfoFactory) private readonly userInfoFactory: UserInfoFactory,
  ) {}

  async execute(command: CreateUserInfoCommand): Promise<void> {
    await this.transactionCommit(command);
  }

  async transactionCommit(command: CreateUserInfoCommand): Promise<void> {
    await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const { userUUID } = command.createUserInfoCommandDTO;

        const new_user_info = this.userInfoFactory.create(userUUID);
        await this.userInfoRepository.createUserInfo(
          new_user_info,
          transactionalEntityManager,
        );
      },
    );
  }
}
