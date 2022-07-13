import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { JWTTokenDTO } from '../../domain/DTO/response';
import { LocalLoginDTO } from '../../domain/DTO/request';


@Controller()
export class AuthController {
  @GrpcMethod('AuthService', 'LocalLogin')
  async localLogin(request : LocalLoginDTO ) : Promise<JWTTokenDTO>{
    await console.log(request)
    await console.log("123312312")
    return  {
      accessToken : "12132",
      refreshToken : "ddew_dewd"
    }
  }
}