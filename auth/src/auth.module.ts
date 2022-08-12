import { CacheModule, Module } from '@nestjs/common';
import { AuthController } from './interface/controller/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateLocalUserHandler } from './application/command-handler/create-local-user.handler';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UserFactory } from './domain/interface/user.class';
import { ConfigModule } from '@nestjs/config';
import { VerifyAccessJWTTokenHandler } from './application/query-handler/verify-access-jwt.handler';
import { ReissueAccessJwtHandler } from './application/query-handler/reissue-access-jwt.handler';
import { LoginLocalUserHandler } from './application/command-handler/login-local-user.handler';
import { CreateTransactionQueue } from './application/queue/create-transaction.queue';
import { BullModule } from '@nestjs/bull';
import { CreateTransactionBullConfig } from './infrastructure/bullmq/config/create-transaction.bull.config';
import { deleteUserTransactionToAuthBullConfig } from './infrastructure/bullmq/config/delete-user/delete-user-transaction-to-auth.bull.config';
import { deleteUserTransactionToSagaBullConfig } from './infrastructure/bullmq/config/delete-user/delete-user-transaction-to-saga.bull.config';
import { DeleteUserConsumer } from './interface/consumer/delete-user.consumer';
import { DeleteUserCommitHandler } from './application/command-handler/delete-user-commit.handler';
import { DeleteUserRollbackHandler } from './application/command-handler/delete-user-rollback.handler';

const deleteUserTransaction = [
  deleteUserTransactionToAuthBullConfig,
  deleteUserTransactionToSagaBullConfig,
];

const application = [
  CreateLocalUserHandler,
  LoginLocalUserHandler,
  VerifyAccessJWTTokenHandler,
  ReissueAccessJwtHandler,
  DeleteUserCommitHandler,
  DeleteUserRollbackHandler,
];

const consumer = [DeleteUserConsumer];

const queue = [CreateTransactionQueue];

const factory = [UserFactory];
const repository = [UserRepository];

@Module({
  imports: [
    CacheModule.register(),
    BullModule.registerQueue(
      CreateTransactionBullConfig,
      ...deleteUserTransaction,
    ),
    CqrsModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [...application, ...factory, ...repository, ...queue, ...consumer],
})
export class AuthModule {}
