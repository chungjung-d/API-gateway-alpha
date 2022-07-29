import { Module } from '@nestjs/common';
import { AuthController } from '../../interface/controller/auth.controller';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
