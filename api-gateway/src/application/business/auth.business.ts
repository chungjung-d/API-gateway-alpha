import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { AuthService } from '../../infrastructure/grpc/interface/auth';
import { grpcClientAuth } from '../../infrastructure/grpc/client/auth.client';
import {
  AccessJWTTokenDTO,
  DeleteUserDTO,
  JWTTokenDTO,
  LocalLoginDTO,
  LocalRegisterDTO,
  ReissueAccessJWTTokenDTO,
  UserInfoDTO,
  VerifyAccessJWTTokenDTO,
} from '../../infrastructure/grpc/DTO/auth/auth.dto';
import {
  AccessJWTTokenHttpDTO,
  JWTTokenHttpDTO,
  UserInfoHttpDTO,
} from '../../interface/DTO/auth.http.dto';

@Injectable()
export class AuthBusiness implements OnModuleInit {
  @Client(grpcClientAuth)
  private readonly grpcClientAuth: ClientGrpc;

  private authService: AuthService;

  onModuleInit() {
    this.authService =
      this.grpcClientAuth.getService<AuthService>('AuthService');
  }

  async localLogin(localLoginDTO: LocalLoginDTO): Promise<JWTTokenHttpDTO> {
    const response: JWTTokenDTO = await this.authService
      .LocalLogin(localLoginDTO)
      .toPromise();
    const { ...jwtTokenHttpDTO } = response;
    return jwtTokenHttpDTO;
  }

  async localRegister(localRegisterDTO: LocalRegisterDTO): Promise<void> {
    await this.authService.LocalRegister(localRegisterDTO).toPromise();
    //TODO 에러처리
  }

  async verifyAccessJWTToken(
    verifyAccessJWTTokenDTO: VerifyAccessJWTTokenDTO,
  ): Promise<UserInfoHttpDTO> {
    const response: UserInfoDTO = await this.authService
      .VerifyAccessJWTToken(verifyAccessJWTTokenDTO)
      .toPromise();
    const { ...userInfoHttpDto } = response;
    return userInfoHttpDto;
  }

  async reissueAccessJWTToken(
    reissueAccessJWTTokenDTO: ReissueAccessJWTTokenDTO,
  ): Promise<AccessJWTTokenHttpDTO> {
    const response: AccessJWTTokenDTO = await this.authService
      .ReissueAccessJWTToken(reissueAccessJWTTokenDTO)
      .toPromise();

    const { ...accessJWTTokenHttpDTO } = response;
    return accessJWTTokenHttpDTO;
  }

  async deleteUser(deleteUserDTO: DeleteUserDTO): Promise<void> {
    await this.authService.DeleteUser(deleteUserDTO).toPromise();
  }
}
