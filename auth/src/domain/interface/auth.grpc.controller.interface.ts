import {
  AccessJWTTokenDTO,
  DeleteUserDTO,
  JWTTokenDTO,
  LocalLoginDTO,
  LocalRegisterDTO,
  ReissueAccessJWTTokenDTO,
  UserInfoDTO,
  VerifyAccessJWTTokenDTO,
} from '../../interface/DTO/auth.dto';

export interface AuthGrpcInterface {
  localLogin(request: LocalLoginDTO): Promise<JWTTokenDTO>;
  localRegister(request: LocalRegisterDTO): Promise<void>;
  verifyAccessJWTToken(request: VerifyAccessJWTTokenDTO): Promise<UserInfoDTO>;
  reissueAccessJWTToken(
    request: ReissueAccessJWTTokenDTO,
  ): Promise<AccessJWTTokenDTO>;
  deleteUser(request: DeleteUserDTO): Promise<void>;
}
