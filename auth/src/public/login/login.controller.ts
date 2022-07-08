import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { JWTToken, LocalLoginData } from '../../type/interface/login';

@Controller()
export class LoginController {


  @GrpcMethod('AuthService', 'LocalLogin')
  async localLogin(localLoginData: LocalLoginData): Promise<JWTToken> {
    await console.log(localLoginData)
    const result : JWTToken = {
      access_token : "1232132321321",
      refresh_token : "fdsafwfewfdsafewa"
    }

    return result
  }


}
