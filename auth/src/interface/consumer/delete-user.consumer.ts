import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { MessageQueueType } from '../../domain/type/mq-type/message-queue.name.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  DeleteUserTransactionToAuthType,
  DeleteUserTransactionToSagaType,
} from '../../domain/type/mq-type/message-queue.message.type';
import { Job, Queue } from 'bull';
import {
  DeleteUserCommand,
  DeleteUserCommandDataType,
} from '../../application/command/delete-user.command';
import { MessageQueueState } from '../../domain/type/mq-type/message-queue.state.type';

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
    job: Job<Omit<DeleteUserCommandDataType, 'messageQueueState'>>,
  ): Promise<void> {
    const deleteUserCommandDTO: DeleteUserCommandDataType = {
      ...job.data,
      messageQueueState: MessageQueueState.COMMIT,
    };

    const command: DeleteUserCommand = await new DeleteUserCommand(
      deleteUserCommandDTO,
    );

    try {
      await this.commandBus.execute(command);
    } catch (e) {
      await this.deleteUserTransactionToSagaQueue.add(
        DeleteUserTransactionToSagaType.AUTH_FAILED,
        job.data,
      );
    }
    await this.deleteUserTransactionToSagaQueue.add(
      DeleteUserTransactionToSagaType.AUTH_SUCCESS,
      job.data,
    );
  }
}
