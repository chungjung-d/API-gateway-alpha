import { InjectQueue, Process, Processor } from '@nestjs/bull';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Job, Queue } from 'bull';
import {
  DeleteUserTransactionToAuthType,
  DeleteUserTransactionToSagaType,
  DeleteUserTransactionToUserType,
} from '../../domin/type/mq-type/message-queue.message.type';
import { MessageQueueType } from '../../domin/type/mq-type/message-queue.name.type';
import {
  DeleteUserCommitCommand,
  DeleteUserCommitCommandDataType,
} from '../../application/command/delete-user-commit.command';

@Processor(MessageQueueType.DELETE_USER_TRANSACTION_TO_USER)
export class DeleteUserConsumer {
  constructor(
    readonly commandBus: CommandBus,
    private queryBus: QueryBus,
    @InjectQueue(MessageQueueType.DELETE_USER_TRANSACTION_TO_SAGA)
    private deleteUserTransactionToSagaQueue: Queue,
  ) {}

  @Process(DeleteUserTransactionToUserType.COMMIT)
  async deleteUserCommit(
    job: Job<DeleteUserCommitCommandDataType>,
  ): Promise<void> {
    await console.log('USER : Auth transaction success & User Rollback');
    await console.log(job.data);

    const deleteUserCommitCommandDTO: DeleteUserCommitCommandDataType =
      job.data;

    const command: DeleteUserCommitCommand = await new DeleteUserCommitCommand(
      deleteUserCommitCommandDTO,
    );

    try {
      await this.commandBus.execute(command);
    } catch (e) {
      await this.deleteUserTransactionToSagaQueue.add(
        DeleteUserTransactionToSagaType.USER_FAILED,
        job.data,
      );

      throw new Error('USER Failed');
    }

    await this.deleteUserTransactionToSagaQueue.add(
      DeleteUserTransactionToSagaType.USER_SUCCESS,
      job.data,
    );
  }
}
