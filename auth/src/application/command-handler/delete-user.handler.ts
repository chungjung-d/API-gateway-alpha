import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../command/delete-user.command';
import { MessageQueueState } from '../../domain/type/mq-type/message-queue.state.type';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler
  implements ICommandHandler<DeleteUserCommand, void>
{
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const transaction_state = command.deleteUserCommandDTO.messageQueueState;

    if (transaction_state === MessageQueueState.COMMIT) {
      await this.transactionCommit(command);
    }

    if (transaction_state === MessageQueueState.ROLLBACK) {
    }
  }

  async transactionCommit(command: DeleteUserCommand): Promise<void> {
    await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const { userUUID, messageQueueState } = command.deleteUserCommandDTO;
        await this.userRepository.deleteUser(
          userUUID,
          transactionalEntityManager,
        );
      },
    );
  }
}
