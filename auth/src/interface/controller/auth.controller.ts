import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcStatusDTO, JWTTokenDTO, LocalLoginDTO, LocalRegisterDTO } from '../../domain/DTO/auth.dto';
import { grpcStatus } from '../../domain/type/message-type/response.message-type';


@Controller()
export class AuthController {

  @GrpcMethod('AuthGrpcService', 'LocalRegister')
  async localRegister(request: LocalRegisterDTO) : Promise<GrpcStatusDTO>{


    return {
      grpcStatus : grpcStatus.OK
    }
  }


  @GrpcMethod('AuthGrpcService', 'LocalLogin')
  async localLogin(request : LocalLoginDTO ) : Promise<JWTTokenDTO>{
    await console.log(request)
    await console.log("123312312")
    return  {
      grpcStatus : grpcStatus.OK,
      accessToken : "12132",
      refreshToken : "ddew_dewd"
    }
  }
}