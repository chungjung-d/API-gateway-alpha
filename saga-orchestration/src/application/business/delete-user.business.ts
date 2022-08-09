import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { MessageQueueType } from '../../domain/type/mq-type/message-queue.name.type';
import {
  DeleteUserTransactionToAuthType,
  DeleteUserTransactionToUserType,
} from '../../domain/type/mq-type/message-queue.message.type';
import { UserEntityType } from '../../domain/type/auth/entity-type/user.entity-type';

export interface DeleteUserType extends Pick<UserEntityType, 'userUUID'> {}

@Injectable()
export class DeleteUserBusiness {
  constructor(
    @InjectQueue(MessageQueueType.DELETE_USER_TRANSACTION_TO_AUTH)
    private deleteUserTransactionToAuthQueue: Queue,

    @InjectQueue(MessageQueueType.DELETE_USER_TRANSACTION_TO_USER)
    private deleteUserTransactionToUserQueue: Queue,
  ) {}

  async authTransactionCommit(job: Job<DeleteUserType>): Promise<void> {
    const deleteUserDTO: DeleteUserType = job.data;

    console.log(job.data);
    await this.deleteUserTransactionToAuthQueue.add(
      DeleteUserTransactionToAuthType.COMMIT,
      deleteUserDTO,
    );
  }

  async userTransactionCommit(job: Job<DeleteUserType>): Promise<void> {
    const deleteUserDTO: DeleteUserType = job.data;

    await this.deleteUserTransactionToUserQueue.add(
      DeleteUserTransactionToUserType.COMMIT,
      deleteUserDTO,
    );
  }

  async authTransactionRollback(job: Job<DeleteUserType>): Promise<void> {
    const deleteUserDTO: DeleteUserType = job.data;

    await this.deleteUserTransactionToAuthQueue.add(
      DeleteUserTransactionToAuthType.ROLLBACK,
      deleteUserDTO,
    );
  }

  async userTransactionRollback(job: Job<DeleteUserType>): Promise<void> {
    const deleteUserDTO: DeleteUserType = job.data;

    await this.deleteUserTransactionToUserQueue.add(
      DeleteUserTransactionToUserType.ROLLBACK,
      deleteUserDTO,
    );
  }
}
