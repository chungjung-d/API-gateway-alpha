import { Module } from '@nestjs/common';
import { AuthController } from '../../interface/controller/auth.controller';
import { AuthBusiness } from '../../application/business/auth.business';

@Module({
  controllers: [AuthController],
  providers: [AuthBusiness],
  exports: [AuthBusiness],
})
export class AuthModule {}
