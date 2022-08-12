import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { MessageQueueType } from '../../domain/type/mq-type/message-queue.name.type';
import {
  DeleteUserTransactionToAuthType,
  DeleteUserTransactionToUserType,
} from '../../domain/type/mq-type/message-queue.message.type';
import { UserEntityType } from '../../domain/type/auth/entity-type/user.entity-type';
import { TransactionIdType } from '../../domain/type/mq-type/message-queue.common';

export interface DeleteUserType
  extends Pick<UserEntityType, 'userUUID'>,
    TransactionIdType {}

@Injectable()
export class DeleteUserBusiness {
  constructor(
    @InjectQueue(MessageQueueType.DELETE_USER_TRANSACTION_TO_AUTH)
    private deleteUserTransactionToAuthQueue: Queue,

    @InjectQueue(MessageQueueType.DELETE_USER_TRANSACTION_TO_USER)
    private deleteUserTransactionToUserQueue: Queue,
  ) {}

  async authTransactionCommit(jobData: DeleteUserType): Promise<void> {
    await this.deleteUserTransactionToAuthQueue.add(
      DeleteUserTransactionToAuthType.COMMIT,
      jobData,
    );
  }

  async userTransactionCommit(jobData: DeleteUserType): Promise<void> {
    await console.log('SAGA : START USER TRANSACTION ');

    await this.deleteUserTransactionToUserQueue.add(
      DeleteUserTransactionToUserType.COMMIT,
      jobData,
    );
  }

  async authTransactionRollback(jobData: DeleteUserType): Promise<void> {
    await console.log('rollback auth');
    await this.deleteUserTransactionToAuthQueue.add(
      DeleteUserTransactionToAuthType.ROLLBACK,
      jobData,
    );
  }

  async userTransactionRollback(jobData: DeleteUserType): Promise<void> {
    await this.deleteUserTransactionToUserQueue.add(
      DeleteUserTransactionToUserType.ROLLBACK,
      jobData,
    );
  }
}
