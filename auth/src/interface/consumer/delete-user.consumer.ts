import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { MessageQueueType } from '../../domain/type/mq-type/message-queue.name.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  DeleteUserTransactionToAuthType,
  DeleteUserTransactionToSagaType,
} from '../../domain/type/mq-type/message-queue.message.type';
import { Job, Queue } from 'bull';
import {
  DeleteUserCommitCommand,
  DeleteUserCommitCommandDataType,
} from '../../application/command/delete-user-commit.command';
import {
  DeleteUserRollbackCommand,
  DeleteUserRollbackCommandDataType,
} from '../../application/command/delete-user-rollback.command';

@Processor(MessageQueueType.DELETE_USER_TRANSACTION_TO_AUTH)
export class DeleteUserConsumer {
  constructor(
    readonly commandBus: CommandBus,
    private queryBus: QueryBus,
    @InjectQueue(MessageQueueType.DELETE_USER_TRANSACTION_TO_SAGA)
    private deleteUserTransactionToSagaQueue: Queue,
  ) {}

  @Process(DeleteUserTransactionToAuthType.COMMIT)
  async deleteUserCommit(
    job: Job<DeleteUserCommitCommandDataType>,
  ): Promise<void> {
    const deleteUserCommitCommandDTO: DeleteUserCommitCommandDataType = {
      ...job.data,
    };

    const command: DeleteUserCommitCommand = await new DeleteUserCommitCommand(
      deleteUserCommitCommandDTO,
    );

    try {
      await this.commandBus.execute(command);
    } catch (e) {
      await this.deleteUserTransactionToSagaQueue.add(
        DeleteUserTransactionToSagaType.AUTH_FAILED,
        job.data,
      );

      throw new Error('Transaction Commit Error');
    }

    await console.log('Auth : transaction commit success');
    await console.log(job.data);

    await this.deleteUserTransactionToSagaQueue.add(
      DeleteUserTransactionToSagaType.AUTH_SUCCESS,
      job.data,
    );
  }

  @Process(DeleteUserTransactionToAuthType.ROLLBACK)
  async deleteUserRollback(
    job: Job<DeleteUserCommitCommandDataType>,
  ): Promise<void> {
    await console.log('Auth : transaction Rollback start');
    await console.log(job.data);

    const deleteUserRollbackCommandDTO: DeleteUserCommitCommandDataType = {
      ...job.data,
    };
    const command: DeleteUserRollbackCommand =
      await new DeleteUserRollbackCommand(deleteUserRollbackCommandDTO);

    await this.commandBus.execute(command);
  }
}
