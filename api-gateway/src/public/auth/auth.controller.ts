import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { grpcClientAuth } from '../../config/client/auth';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { AuthService, JWTToken } from '../../type/interface/auth';
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
  async localLogin(){
    const result =  await this.authService.LocalLogin({id:"231321",ps:"fsdfsds"}).pipe(
      map((obj:JWTToken) =>{return obj}))
    await console.log(typeof (result))
    await console.log(result)
  }

}
