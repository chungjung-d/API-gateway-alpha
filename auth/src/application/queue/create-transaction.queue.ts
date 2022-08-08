import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { DeleteUserDTO } from '../../interface/DTO/auth.dto';
import { CreateTransactionType } from '../../infrastructure/bullmq/message-queue.format';

@Injectable()
export class CreateTransactionQueue {
  constructor(
    @InjectQueue('create-transaction') private createTransactionQueue: Queue,
  ) {}

  async deleteUser(deleteUserDTO: DeleteUserDTO): Promise<void> {
    await this.createTransactionQueue.add(
      CreateTransactionType.DELETE_USER_TRANSACTION,
      deleteUserDTO,
    );
  }
}
