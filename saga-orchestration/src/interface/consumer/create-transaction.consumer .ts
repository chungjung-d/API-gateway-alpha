import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('create-transaction')
export class CreateTransactionConsumer {
  @Process('delete-user')
  async DeleteUserTransaction(job: Job<unknown>) {
    console.log(job.data);
  }
}
