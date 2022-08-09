import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateTransactionType } from '../../domain/type/mq-type/message-queue.message.type';
import { MessageQueueType } from '../../domain/type/mq-type/message-queue.name.type';
import {
  DeleteUserBusiness,
  DeleteUserType,
} from '../../application/business/delete-user.business';

@Processor(MessageQueueType.CREATE_TRANSACTION)
export class CreateTransactionConsumer {
  constructor(private readonly deleteUserBusiness: DeleteUserBusiness) {}

  @Process(CreateTransactionType.DELETE_USER_TRANSACTION)
  async createDeleteUserTransaction(job: Job<DeleteUserType>) {
    await this.deleteUserBusiness.authTransactionCommit(job);
  }
}
