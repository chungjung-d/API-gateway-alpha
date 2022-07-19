import { Module } from '@nestjs/common';
import { AuthController } from '../../interface/controller/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/command/create-user.command';

const application = [CreateUserCommand]

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [...application]
})
export class AuthModule {}
