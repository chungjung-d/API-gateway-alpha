import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AccessJWTTokenDTO,
  GrpcStatusDTO,
  JWTTokenDTO,
  LocalLoginDTO,
  LocalRegisterDTO,
  ReissueAccessJWTTokenDTO,
  UserInfoDTO,
  VerifyAccessJWTTokenDTO,
} from '../DTO/auth.dto';
import { grpcStatus } from '../../domain/type/message-type/response.message-type';
import { CreateLocalUserCommand } from '../../application/command/create-local-user.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginLocalUserCommand } from '../../application/command/login-local-user.command';
import { JWTTokenDataType } from '../../domain/type/message-type/auth.command.message-type';
import { AuthGrpcInterface } from '../../domain/interface/auth.grpc.controller.interface';
import { VerifyAccessJWTTokenQuery } from '../../application/query/verify-access-jwt.query';
import { ReissueAccessJwtQuery } from '../../application/query/reissue-access-jwt.query';

@Controller()
export class AuthController implements AuthGrpcInterface {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod('AuthService', 'LocalRegister')
  async localRegister(request: LocalRegisterDTO): Promise<GrpcStatusDTO> {
    const createLocalUserCommandDTO = {
      userEmailId: request.userEmailId,
      userPassword: request.userPassword,
    };
    const command: CreateLocalUserCommand = await new CreateLocalUserCommand(
      createLocalUserCommandDTO,
    );
    await this.commandBus.execute(command);

    return {
      grpcStatus: grpcStatus.OK,
    };
  }

  @GrpcMethod('AuthService', 'LocalLogin')
  async localLogin(request: LocalLoginDTO): Promise<JWTTokenDTO> {
    const loginLocalUserCommandDTO = {
      userEmailId: request.userEmailId,
      userPassword: request.userPassword,
    };

    const command: LoginLocalUserCommand = await new LoginLocalUserCommand(
      loginLocalUserCommandDTO,
    );

    const jwtToken: JWTTokenDataType = await this.commandBus.execute(command);

    return {
      ...jwtToken,
      grpcStatus: grpcStatus.OK,
    };
  }

  @GrpcMethod('AuthService', 'VerifyAccessJWTToken')
  async verifyAccessJWTToken(
    request: VerifyAccessJWTTokenDTO,
  ): Promise<UserInfoDTO> {
    const verifyAccessJWTTokenQueryDTO = {
      accessToken: request.accessToken,
    };

    const verifyAccessJWTTokenQuery: VerifyAccessJWTTokenQuery =
      new VerifyAccessJWTTokenQuery(verifyAccessJWTTokenQueryDTO);
    const response = await this.queryBus.execute(verifyAccessJWTTokenQuery);

    return {
      ...response,
      grpcStatus: grpcStatus.OK,
    };
  }

  @GrpcMethod('AuthService', 'ReissueAccessJWTToken')
  async reissueAccessJWTToken(
    request: ReissueAccessJWTTokenDTO,
  ): Promise<AccessJWTTokenDTO> {
    const reissueAccessJwtQueryDTO = { refreshToken: request.refreshToken };

    const reissueAccessJwtQuery: ReissueAccessJwtQuery =
      new ReissueAccessJwtQuery(reissueAccessJwtQueryDTO);

    const accessJWTToken = await this.queryBus.execute(reissueAccessJwtQuery);

    return { ...accessJWTToken, grpcStatus: grpcStatus.OK };
  }
}
