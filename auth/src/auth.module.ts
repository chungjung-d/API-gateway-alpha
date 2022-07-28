import { Module } from '@nestjs/common';
import { AuthController } from './interface/controller/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { createLocalUserHandler } from './application/command-handler/create-local-user.handler';
import { CustomTypeOrmModule } from './infrastructure/repository/typeorm-ex.module';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UserFactory } from './domain/interface/user.class';
import { loginLocalUserHandler } from './application/command-handler/login-local-user.command';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { VerifyAccessJWTTokenHandler } from './application/query-handler/verify-access-jwt.handler';
import { CreateLocalUserCommand } from './application/command/create-local-user.command';
import { LoginLocalUserCommand } from './application/command/login-local-user.command';
import { ReissueAccessJwtHandler } from './application/command-handler/reissue-access-jwt.handler';

const application = [
  CreateLocalUserCommand,
  LoginLocalUserCommand,
  VerifyAccessJWTTokenHandler,
  ReissueAccessJwtHandler,
];
const factory = [UserFactory];
const repository = [UserRepository];

@Module({
  imports: [
    CqrsModule,
    CustomTypeOrmModule.forCustomRepository(repository),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [...application, ...factory],
})
export class AuthModule {}
