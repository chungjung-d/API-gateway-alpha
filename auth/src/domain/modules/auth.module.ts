import { Module } from '@nestjs/common';
import { AuthService } from '../../application/auth.service';
import { AuthController } from '../../interface/controller/auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
