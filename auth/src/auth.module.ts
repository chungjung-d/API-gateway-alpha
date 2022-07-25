import { Module } from '@nestjs/common';
import { AuthController } from './interface/controller/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { createLocalUserHandler } from './application/handler/create-local-user.handler';
import { CustomTypeOrmModule } from './infrastructure/repository/typeorm-ex.module';
import { UserRepository } from './infrastructure/repository/user.repository';

const application = [createLocalUserHandler]

@Module({
  imports: [CqrsModule,
    CustomTypeOrmModule.forCustomRepository(
      [UserRepository]
    )
  ],
  controllers: [AuthController],
  providers: [...application]
})
export class AuthModule {}
