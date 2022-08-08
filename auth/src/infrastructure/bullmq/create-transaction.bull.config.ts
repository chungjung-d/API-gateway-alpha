import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CreateTransactionQueue } from '../../application/queue/create-transaction.queue';

export const BullConfig = {
  name: 'create-transaction',
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    redis: {
      host: configService.get('REDIS_QUEUE_HOST'),
      port: +configService.get('REDIS_QUEUE_PORT'),
    },
  }),
  inject: [ConfigService],
};
