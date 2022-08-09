import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { MessageQueueType } from '../../domain/type/mq-type/message-queue.name.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  DeleteUserTransactionToAuthType,
  DeleteUserTransactionToSagaType,
} from '../../domain/type/mq-type/message-queue.message.type';
import { Job, Queue } from 'bull';

@Processor(MessageQueueType.DELETE_USER_TRANSACTION_TO_AUTH)
export class DeleteUserConsumer {
  constructor(
    readonly commandBus: CommandBus,
    private queryBus: QueryBus,
    @InjectQueue(MessageQueueType.DELETE_USER_TRANSACTION_TO_SAGA)
    private deleteUserTransactionToSagaQueue: Queue,
  ) {}

  @Process(DeleteUserTransactionToAuthType.COMMIT)
  async deleteUserCommit(job: Job<any>): Promise<void> {
    console.log(job.data, job.id);

    await this.deleteUserTransactionToSagaQueue.add(
      DeleteUserTransactionToSagaType.AUTH_SUCCESS,
      job.data,
    );
  }
}
