import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import {
  CreateTransactionType,
  DeleteUserTransactionToSagaType,
} from '../../domain/type/mq-type/message-queue.message.type';
import { MessageQueueType } from '../../domain/type/mq-type/message-queue.name.type';
import {
  DeleteUserBusiness,
  DeleteUserType,
} from '../../application/business/delete-user.business';

@Processor(MessageQueueType.DELETE_USER_TRANSACTION_TO_SAGA)
export class DeleteUserConsumer {
  constructor(private readonly deleteUserBusiness: DeleteUserBusiness) {}

  @Process(DeleteUserTransactionToSagaType.AUTH_SUCCESS)
  async authTransactionSuccess(job: Job<DeleteUserType>): Promise<void> {
    await this.deleteUserBusiness.userTransactionCommit(job);
  }

  @Process(DeleteUserTransactionToSagaType.AUTH_FAILED)
  async authTransactionFailed(job: Job<DeleteUserType>): Promise<void> {
    console.log(job);
    console.log('ERROR');
  }

  @Process(DeleteUserTransactionToSagaType.USER_SUCCESS)
  async userTransactionSuccess(job: Job<DeleteUserType>): Promise<void> {
    console.log(job);
    console.log('SUCCESS');
  }

  @Process(DeleteUserTransactionToSagaType.USER_FAILED)
  async userTransactionFailed(job: Job<DeleteUserType>): Promise<void> {
    console.log(job);
    await this.deleteUserBusiness.authTransactionRollback(job);
  }
}
