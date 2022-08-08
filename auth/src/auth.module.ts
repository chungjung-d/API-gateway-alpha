import { Module } from '@nestjs/common';
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
import { BullConfig } from './infrastructure/bullmq/create-transaction.bull.config';

const application = [
  CreateLocalUserHandler,
  LoginLocalUserHandler,
  VerifyAccessJWTTokenHandler,
  ReissueAccessJwtHandler,
];

const queue = [CreateTransactionQueue];

const factory = [UserFactory];
const repository = [UserRepository];

@Module({
  imports: [BullModule.registerQueue(BullConfig), CqrsModule, ConfigModule],
  controllers: [AuthController],
  providers: [...application, ...factory, ...repository, ...queue],
})
export class AuthModule {}
