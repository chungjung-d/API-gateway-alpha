import {
  AccessJWTTokenDTO,
  GrpcStatusDTO,
  JWTTokenDTO,
  LocalLoginDTO,
  LocalRegisterDTO,
  ReissueAccessJWTTokenDTO,
  UserInfoDTO,
  VerifyAccessJWTTokenDTO,
} from '../../interface/DTO/auth.dto';

export interface AuthGrpcInterface {
  localLogin(request: LocalLoginDTO): Promise<JWTTokenDTO>;
  localRegister(request: LocalRegisterDTO): Promise<GrpcStatusDTO>;
  verifyAccessJWTToken(request: VerifyAccessJWTTokenDTO): Promise<UserInfoDTO>;
  reissueAccessJWTToken(
    request: ReissueAccessJWTTokenDTO,
  ): Promise<AccessJWTTokenDTO>;
}
