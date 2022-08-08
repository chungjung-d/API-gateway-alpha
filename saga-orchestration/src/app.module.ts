import { Module } from '@nestjs/common';
import { BullmqModule } from './infrastructure/bullmq/bullmq.module';
import { CreateTransactionConsumer } from './interface/consumer/create-transaction.consumer ';

@Module({
  imports: [BullmqModule],
  controllers: [],
  providers: [CreateTransactionConsumer],
})
export class AppModule {}
