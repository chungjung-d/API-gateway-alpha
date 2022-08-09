import { InjectQueue, Process, Processor } from '@nestjs/bull';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Job, Queue } from 'bull';
import {
  DeleteUserTransactionToAuthType,
  DeleteUserTransactionToSagaType,
  DeleteUserTransactionToUserType,
} from '../../domin/type/mq-type/message-queue.message.type';
import { MessageQueueType } from '../../domin/type/mq-type/message-queue.name.type';

@Processor(MessageQueueType.DELETE_USER_TRANSACTION_TO_USER)
export class DeleteUserConsumer {
  constructor(
    readonly commandBus: CommandBus,
    private queryBus: QueryBus,
    @InjectQueue(MessageQueueType.DELETE_USER_TRANSACTION_TO_SAGA)
    private deleteUserTransactionToSagaQueue: Queue,
  ) {}

  @Process(DeleteUserTransactionToUserType.COMMIT)
  async deleteUserCommit(job: Job<any>): Promise<void> {
    await this.deleteUserTransactionToSagaQueue.add(
      DeleteUserTransactionToSagaType.USER_SUCCESS,
      job.data,
    );
  }
}
