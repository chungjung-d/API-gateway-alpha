import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  DeleteUserDTO,
  ReissueAccessJWTTokenDTO,
} from '../../infrastructure/grpc/DTO/auth/auth.dto';
import { VerifyAccessJwtInterceptor } from '../../application/interceptor/verify-access-jwt.interceptor';
import { AuthBusiness } from '../../application/business/auth.business';
import {
  AccessJWTTokenHttpDTO,
  JWTTokenHttpDTO,
  LocalLoginHttpDTO,
  LocalRegisterHttpDTO,
  UserInfoHttpDTO,
} from '../DTO/auth.http.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authBusiness: AuthBusiness) {}

  @Post('register/local')
  async localRegister(
    @Body() localRegisterHttpDTO: LocalRegisterHttpDTO,
  ): Promise<void> {
    await this.authBusiness.localRegister(localRegisterHttpDTO);
  }

  @Post('login/local')
  async localLogin(
    @Body() localLoginHttpDTO: LocalLoginHttpDTO,
  ): Promise<JWTTokenHttpDTO> {
    return await this.authBusiness.localLogin(localLoginHttpDTO);
  }

  @UseInterceptors(VerifyAccessJwtInterceptor)
  @Get('jwt/verify')
  async verifyAccessJWTToken(@Req() req): Promise<UserInfoHttpDTO> {
    return req.user;
  }

  @Post('jwt/reissue')
  async reissueAccessJWTToken(
    @Body() reissueAccessJWTTokenDTO: ReissueAccessJWTTokenDTO,
  ): Promise<AccessJWTTokenHttpDTO> {
    return await this.authBusiness.reissueAccessJWTToken(
      reissueAccessJWTTokenDTO,
    );
  }

  @UseInterceptors(VerifyAccessJwtInterceptor)
  @Delete('')
  async deleteUser(@Req() req): Promise<void> {
    await this.authBusiness.deleteUser({ userUUID: req.user.userUUID });
  }
}
