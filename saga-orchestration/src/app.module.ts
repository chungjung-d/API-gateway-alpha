import { Module } from '@nestjs/common';
import { CreateTransactionConsumer } from './interface/consumer/create-transaction.consumer ';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CreateTransactionBullConfig } from './infrastructure/bullmq/config/create-transaction.bull.config';
import { deleteUserTransactionToAuthBullConfig } from './infrastructure/bullmq/config/delete-user/delete-user-transaction-to-auth.bull.config';
import { deleteUserTransactionToUserBullConfig } from './infrastructure/bullmq/config/delete-user/delete-user-transaction-to-user.bull.config';
import { deleteUserTransactionToSagaBullConfig } from './infrastructure/bullmq/config/delete-user/delete-user-transaction-to-saga.bull.config';
import { DeleteUserConsumer } from './interface/consumer/delete-user.consumer';
import { DeleteUserBusiness } from './application/business/delete-user.business';

const deleteUserTransaction = [
  deleteUserTransactionToAuthBullConfig,
  deleteUserTransactionToUserBullConfig,
  deleteUserTransactionToSagaBullConfig,
];

const consumer = [CreateTransactionConsumer, DeleteUserConsumer];
const business = [DeleteUserBusiness];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : process.env.NODE_ENV === 'stage'
          ? '.stage.env'
          : '.develop.env',
    }),
    BullModule.registerQueueAsync(
      CreateTransactionBullConfig,
      ...deleteUserTransaction,
    ),
  ],
  controllers: [],
  providers: [...consumer, ...business],
})
export class AppModule {}
