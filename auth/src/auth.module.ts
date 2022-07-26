import { Module } from '@nestjs/common';
import { AuthController } from './interface/controller/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { createLocalUserHandler } from './application/handler/create-local-user.handler';
import { CustomTypeOrmModule } from './infrastructure/repository/typeorm-ex.module';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UserFactory } from './domain/interface/user.class';
import { loginLocalUserHandler } from './application/handler/login-local-user.command';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

const application = [createLocalUserHandler,loginLocalUserHandler]
const factory = [UserFactory]
const repository = [UserRepository]

@Module({
  imports: [
    CqrsModule,
    CustomTypeOrmModule.forCustomRepository(
      repository
    ),
    PassportModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [...application, ...factory]
})
export class AuthModule {}
