import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageQueueType } from '../../../../domain/type/mq-type/message-queue.name.type';

export const deleteUserTransactionToSagaBullConfig = {
  name: MessageQueueType.DELETE_USER_TRANSACTION_TO_SAGA,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    redis: {
      host: configService.get('REDIS_QUEUE_HOST'),
      port: +configService.get('REDIS_QUEUE_PORT'),
    },
  }),
  inject: [ConfigService],
};
