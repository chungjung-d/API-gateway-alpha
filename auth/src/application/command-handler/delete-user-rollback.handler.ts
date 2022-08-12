import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../infrastructure/repository/user.repository';
import { DataSource, EntityManager } from 'typeorm';
import { DeleteUserCommitCommand } from '../command/delete-user-commit.command';
import { Cache } from 'cache-manager';
import { DeleteUserRollbackCommand } from '../command/delete-user-rollback.command';
import { UserFactory, UserProperties } from '../../domain/interface/user.class';

@Injectable()
@CommandHandler(DeleteUserRollbackCommand)
export class DeleteUserRollbackHandler
  implements ICommandHandler<DeleteUserRollbackCommand, void>
{
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(command: DeleteUserRollbackCommand): Promise<void> {
    await this.transactionRollback(command);
  }

  async transactionRollback(command: DeleteUserRollbackCommand): Promise<void> {
    await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const { userUUID, transactionId } =
          command.deleteUserRollbackCommandDTO;

        const userData: UserProperties | undefined =
          await this.cacheManager.get(transactionId);

        if (userData === undefined) {
          throw new Error('User Cache deleted');
        }
        const new_user = await this.userFactory.reconstitute(userData);

        await this.userRepository.createUser(
          new_user,
          transactionalEntityManager,
        );
      },
    );
  }
}
