import { Module } from '@nestjs/common';

import { UserController } from '../../interface/controller/user.controller';
import { UserBusiness } from '../../application/business/user.business';
import { AuthBusiness } from '../../application/business/auth.business';

@Module({
  controllers: [UserController],
  providers: [UserBusiness, AuthBusiness],
})
export class UserModule {}
