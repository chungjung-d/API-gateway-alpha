import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { grpcClientAuth } from '../../infrastructure/grpc/client/auth.client';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { AuthService } from '../../infrastructure/grpc/interface/auth';
import {
  AccessJWTTokenDTO,
  GrpcStatusDTO,
  JWTTokenDTO,
  ReissueAccessJWTTokenDTO,
  UserInfoDTO,
  VerifyAccessJWTTokenDTO,
} from '../../infrastructure/grpc/DTO/auth/auth.dto';

@Controller('/public/auth')
export class AuthController implements OnModuleInit {
  @Client(grpcClientAuth)
  private readonly grpcClientAuth: ClientGrpc;

  private authService: AuthService;

  onModuleInit() {
    this.authService =
      this.grpcClientAuth.getService<AuthService>('AuthService');
  }

  @Get('login/local')
  async localLogin(): Promise<JWTTokenDTO> {
    return await this.authService
      .LocalLogin({
        userEmailId: 'dewdewdwedewdwdew',
        userPassword: 'dewdedewdew',
      })
      .toPromise();
  }

  @Get('register/local')
  async localRegister(): Promise<GrpcStatusDTO> {
    return await this.authService
      .LocalRegister({
        userEmailId: 'dewdewdwedewdwdew',
        userPassword: 'dewdedewdew',
      })
      .toPromise();
  }

  @Post('jwt/verify')
  async verifyAccessJWTToken(
    @Body() verifyAccessJWTTokenDTO: VerifyAccessJWTTokenDTO,
  ): Promise<UserInfoDTO> {
    return await this.authService
      .VerifyAccessJWTToken(verifyAccessJWTTokenDTO)
      .toPromise();
  }

  @Post('jwt/reissue')
  async reissueAccessJWTToken(
    @Body() reissueAccessJWTTokenDTO: ReissueAccessJWTTokenDTO,
  ): Promise<AccessJWTTokenDTO> {
    return await this.authService
      .ReissueAccessJWTToken(reissueAccessJWTTokenDTO)
      .toPromise();
  }
}
