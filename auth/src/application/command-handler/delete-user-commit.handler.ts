import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../infrastructure/repository/user.repository';
import { DataSource, EntityManager } from 'typeorm';
import { DeleteUserCommitCommand } from '../command/delete-user-commit.command';
import { Cache } from 'cache-manager';

@Injectable()
@CommandHandler(DeleteUserCommitCommand)
export class DeleteUserCommitHandler
  implements ICommandHandler<DeleteUserCommitCommand, void>
{
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(command: DeleteUserCommitCommand): Promise<void> {
    await this.transactionCommit(command);
  }

  async transactionCommit(command: DeleteUserCommitCommand): Promise<void> {
    await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const { userUUID, transactionId } = command.deleteUserCommandDTO;

        const user = await this.userRepository.findByUUID(
          userUUID,
          transactionalEntityManager,
        );
        await this.userRepository.deleteUser(
          userUUID,
          transactionalEntityManager,
        );
        await this.cacheManager.set(transactionId, user.properties());
      },
    );
  }
}
