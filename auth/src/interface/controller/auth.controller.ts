import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcStatusDTO, JWTTokenDTO, LocalLoginDTO, LocalRegisterDTO } from '../DTO/auth.dto';
import { grpcStatus } from '../../domain/type/message-type/response.message-type';
import { CreateUserCommand } from '../../application/command/create-user.command';
import { CommandBus } from '@nestjs/cqrs';


@Controller()
export class AuthController {

  constructor(
    private commandBus: CommandBus,
  ) { }

  @GrpcMethod('AuthService', 'LocalRegister')
  async localRegister(request: LocalRegisterDTO) : Promise<GrpcStatusDTO>{

    const CreateUserCommandDTO = {userEmailId : request.userEmailId , userPassword : request.userPassword}

    const command = new CreateUserCommand(CreateUserCommandDTO)

    await this.commandBus.execute(command)

    return {
      grpcStatus : grpcStatus.OK
    }
  }


  @GrpcMethod('AuthService', 'LocalLogin')
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