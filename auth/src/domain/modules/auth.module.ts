import { Module } from '@nestjs/common';
import { AuthController } from '../../interface/controller/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from '../../application/handler/create-user.handler';

const application = [CreateUserHandler]

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [...application]
})
export class AuthModule {}
