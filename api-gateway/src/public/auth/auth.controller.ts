import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { grpcClientAuth } from '../../config/client/auth';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { AuthService, GrpcStatusData, JWTToken } from '../../type/interface/auth';
import { map, Observable } from 'rxjs';

@Controller('/public/auth')
export class AuthController implements OnModuleInit{

  @Client(grpcClientAuth)
  private readonly grpcClientAuth: ClientGrpc;

  private authService: AuthService

  onModuleInit(){
    this.authService = this.grpcClientAuth.getService<AuthService>('AuthService')
  }

  @Get('login/local')
  async localLogin(): Promise<JWTToken> {
    return await this.authService.LocalLogin({userEmailId:"231321",userPassword:"fsdfsds"}).toPromise()
  }

  @Get('register/local')
  async localRegister(): Promise<GrpcStatusData> {
    return await this.authService.LocalRegister({userEmailId:"231321",userPassword:"fsdfsds"}).toPromise()
  }

}
