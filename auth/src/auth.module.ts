import { Module } from '@nestjs/common';
import { AuthController } from './interface/controller/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateLocalUserHandler } from './application/command-handler/create-local-user.handler';
import { CustomTypeOrmModule } from './infrastructure/repository/typeorm-ex.module';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UserFactory } from './domain/interface/user.class';
import { ConfigModule } from '@nestjs/config';
import { VerifyAccessJWTTokenHandler } from './application/query-handler/verify-access-jwt.handler';
import { ReissueAccessJwtHandler } from './application/command-handler/reissue-access-jwt.handler';
import { LoginLocalUserHandler } from './application/command-handler/login-local-user.handler';

const application = [
  CreateLocalUserHandler,
  LoginLocalUserHandler,
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
