import { Module } from '@nestjs/common';
import { BullmqModule } from './infrastructure/bullmq/bullmq.module';

@Module({
  imports: [BullmqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
