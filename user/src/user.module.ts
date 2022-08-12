import { Module } from '@nestjs/common';
import { UserController } from './interface/conrtroller/user.controller';
import { UserInfoFactory } from './domin/interface/user-info.class';
import { UserInfoRepository } from './infrastructure/repository/user-info.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { CreateUserInfoHandler } from './application/command-handler/create-user-info.handler';
import { BullModule } from '@nestjs/bull';
import { deleteUserTransactionToSagaBullConfig } from './infrastructure/bullmq/config/delete-user/delete-user-transaction-to-saga.bull.config';
import { deleteUserTransactionToUserBullConfig } from './infrastructure/bullmq/config/delete-user/delete-user-transaction-to-user.bull.config';
import { CreateTransactionBullConfig } from './infrastructure/bullmq/config/create-transaction.bull.config';
import { DeleteUserConsumer } from './interface/consumer/delete-user.consumer';
import { DeleteUserCommitHandler } from './application/command-handler/delete-user-commit.handler';

const deleteUserTransaction = [
  deleteUserTransactionToUserBullConfig,
  deleteUserTransactionToSagaBullConfig,
];

const consumer = [DeleteUserConsumer];
const application = [CreateUserInfoHandler, DeleteUserCommitHandler];
const factory = [UserInfoFactory];
const repository = [UserInfoRepository];

@Module({
  imports: [
    BullModule.registerQueueAsync(
      CreateTransactionBullConfig,
      ...deleteUserTransaction,
    ),
    CqrsModule,
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [...factory, ...repository, ...application, ...consumer],
})
export class UserModule {}
