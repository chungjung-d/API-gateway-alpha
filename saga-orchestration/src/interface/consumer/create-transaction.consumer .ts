import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateTransactionType } from '../../domain/type/mq-type/message-queue.message.type';
import { MessageQueueType } from '../../domain/type/mq-type/message-queue.name.type';
import {
  DeleteUserBusiness,
  DeleteUserType,
} from '../../application/business/delete-user.business';
import { TransactionIdType } from '../../domain/type/mq-type/message-queue.common';
import { v4 as uuid } from 'uuid';

export interface CreateDeleteUserTransactionDataType
  extends Omit<DeleteUserType, 'transactionId'> {}

@Processor(MessageQueueType.CREATE_TRANSACTION)
export class CreateTransactionConsumer {
  constructor(private readonly deleteUserBusiness: DeleteUserBusiness) {}

  @Process(CreateTransactionType.DELETE_USER_TRANSACTION)
  async createDeleteUserTransaction(
    job: Job<CreateDeleteUserTransactionDataType>,
  ) {
    const uuid = await this.GenerateUUID();

    const jobData = {
      ...job.data,
      transactionId: `${CreateTransactionType.DELETE_USER_TRANSACTION}_${uuid}`,
    };

    await this.deleteUserBusiness.authTransactionCommit(jobData);
  }

  private async GenerateUUID(): Promise<string> {
    return await uuid();
  }
}
