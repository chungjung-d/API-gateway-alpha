import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { JWTToken, LocalLoginData } from '../type/interface/login';

@Controller()
export class PublicController {

  @GrpcMethod('AuthService', 'LocalLogin')
  async localLogin(request : LocalLoginData ) : Promise<JWTToken>{
    await console.log(request)
    await console.log("123312312")
    return  {
      accessToken : "12132",
      refreshToken : "ddew_dewd"
    }
  }

}
