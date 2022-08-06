import { Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { VerifyAccessJwtInterceptor } from '../../application/interceptor/verify-access-jwt.interceptor';
import { UserBusiness } from '../../application/business/user.business';

@Controller('/user')
export class UserController {
  constructor(private readonly userBusiness: UserBusiness) {}

  @UseInterceptors(VerifyAccessJwtInterceptor)
  @Post('/info')
  async createUserInfo(@Req() req): Promise<void> {
    const userUUID = req.user.userUUID;
    await this.userBusiness.createUserInfo({ userUUID: userUUID });
  }
}
