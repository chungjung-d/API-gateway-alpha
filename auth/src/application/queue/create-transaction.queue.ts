import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { DeleteUserDTO } from '../../interface/DTO/auth.dto';
import { CreateTransactionType } from '../../domain/type/mq-type/message-queue.message.type';
import { MessageQueueType } from '../../domain/type/mq-type/message-queue.name.type';

@Injectable()
export class CreateTransactionQueue {
  constructor(
    @InjectQueue(MessageQueueType.CREATE_TRANSACTION)
    private createTransactionQueue: Queue,
  ) {}

  async deleteUser(deleteUserDTO: DeleteUserDTO): Promise<void> {
    await this.createTransactionQueue.add(
      CreateTransactionType.DELETE_USER_TRANSACTION,
      deleteUserDTO,
    );
  }
}
