import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AccessJWTTokenDTO,
  DeleteUserDTO,
  JWTTokenDTO,
  LocalLoginDTO,
  LocalRegisterDTO,
  ReissueAccessJWTTokenDTO,
  UserInfoDTO,
  VerifyAccessJWTTokenDTO,
} from '../DTO/auth.dto';
import { CreateLocalUserCommand } from '../../application/command/create-local-user.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginLocalUserCommand } from '../../application/command/login-local-user.command';
import { JWTTokenDataType } from '../../domain/type/message-type/auth.command.message-type';
import { AuthGrpcInterface } from '../../domain/interface/auth.grpc.controller.interface';
import { VerifyAccessJWTTokenQuery } from '../../application/query/verify-access-jwt.query';
import { ReissueAccessJwtQuery } from '../../application/query/reissue-access-jwt.query';
import { CreateTransactionQueue } from '../../application/queue/create-transaction.queue';

@Controller()
export class AuthController implements AuthGrpcInterface {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private createTransactionQueue: CreateTransactionQueue,
  ) {}

  @GrpcMethod('AuthService', 'LocalRegister')
  async localRegister(request: LocalRegisterDTO): Promise<void> {
    const createLocalUserCommandDTO = {
      userEmailId: request.userEmailId,
      userPassword: request.userPassword,
    };
    const command: CreateLocalUserCommand = await new CreateLocalUserCommand(
      createLocalUserCommandDTO,
    );
    await this.commandBus.execute(command);
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

    return jwtToken;
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

    return response;
  }

  @GrpcMethod('AuthService', 'ReissueAccessJWTToken')
  async reissueAccessJWTToken(
    request: ReissueAccessJWTTokenDTO,
  ): Promise<AccessJWTTokenDTO> {
    const reissueAccessJwtQueryDTO = { refreshToken: request.refreshToken };

    const reissueAccessJwtQuery: ReissueAccessJwtQuery =
      new ReissueAccessJwtQuery(reissueAccessJwtQueryDTO);

    const accessJWTToken = await this.queryBus.execute(reissueAccessJwtQuery);

    return accessJWTToken;
  }

  @GrpcMethod('AuthService', 'DeleteUser')
  async deleteUser(request: DeleteUserDTO): Promise<void> {
    await this.createTransactionQueue.deleteUser(request);
  }
}
