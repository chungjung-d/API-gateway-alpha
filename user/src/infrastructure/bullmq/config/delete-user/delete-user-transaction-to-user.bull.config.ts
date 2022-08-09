import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageQueueType } from '../../../../domin/type/mq-type/message-queue.name.type';

export const deleteUserTransactionToUserBullConfig = {
  name: MessageQueueType.DELETE_USER_TRANSACTION_TO_USER,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    redis: {
      host: configService.get('REDIS_QUEUE_HOST'),
      port: +configService.get('REDIS_QUEUE_PORT'),
    },
  }),
  inject: [ConfigService],
};
