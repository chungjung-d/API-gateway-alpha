import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserInfoCommand } from '../command/create-user-info.command';
import { DataSource, EntityManager } from 'typeorm';
import { UserInfoFactory } from '../../domin/interface/user-info.class';
import { UserInfoRepository } from '../../infrastructure/repository/user-info.repository';
import { DeleteUserCommitCommand } from '../command/delete-user-commit.command';

@Injectable()
@CommandHandler(DeleteUserCommitCommand)
export class DeleteUserCommitHandler
  implements ICommandHandler<DeleteUserCommitCommand, void>
{
  constructor(
    private readonly dataSource: DataSource,
    private readonly userInfoRepository: UserInfoRepository,
    @Inject(UserInfoFactory) private readonly userInfoFactory: UserInfoFactory,
  ) {}

  async execute(command: DeleteUserCommitCommand): Promise<void> {
    await this.transactionCommit(command);
  }

  async transactionCommit(command: DeleteUserCommitCommand): Promise<void> {
    await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const { userUUID, transactionId } = command.deleteUserCommitCommandDTO;
        await this.userInfoRepository.deleteUserInfo(
          userUUID,
          transactionalEntityManager,
        );
      },
    );
  }
}
