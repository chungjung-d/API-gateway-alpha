import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcStatusDTO, JWTTokenDTO, LocalLoginDTO, LocalRegisterDTO } from '../DTO/auth.dto';
import { grpcStatus } from '../../domain/type/message-type/response.message-type';
import { createLocalUserCommand } from '../../application/command/create-local-user.command';
import { CommandBus } from '@nestjs/cqrs';
import { loginLocalUserCommand } from '../../application/command/login-local-user.command';
import { JWTTokenDataType } from '../../domain/type/message-type/auth.message-type';


@Controller()
export class AuthController {

  constructor(
    private commandBus: CommandBus,
  ) { }

  @GrpcMethod('AuthService', 'LocalRegister')
  async localRegister(request: LocalRegisterDTO) : Promise<GrpcStatusDTO>{

    const createLocalUserCommandDTO = {userEmailId : request.userEmailId , userPassword : request.userPassword}
    const command : createLocalUserCommand = await new createLocalUserCommand(createLocalUserCommandDTO);
    await this.commandBus.execute(command)

    return {
      grpcStatus : grpcStatus.OK
    }
  }


  @GrpcMethod('AuthService', 'LocalLogin')
  async localLogin(request : LocalLoginDTO ) : Promise<JWTTokenDTO>{

    const loginLocalUserCommandDTO = {userEmailId : request.userEmailId , userPassword : request.userPassword}
    const command : loginLocalUserCommand = await new loginLocalUserCommand(loginLocalUserCommandDTO);
    const jwtToken : JWTTokenDataType=  await this.commandBus.execute(command);
    return  {
      ...jwtToken,
      grpcStatus : grpcStatus.OK,
    }
  }
}