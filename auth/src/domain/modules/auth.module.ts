import { Module } from '@nestjs/common';
import { AuthController } from '../../interface/controller/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [AuthController]
})
export class AuthModule {}
