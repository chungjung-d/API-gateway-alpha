import { Observable } from 'rxjs';
import {
  AccessJWTTokenDTO,
  GrpcStatusDTO,
  JWTTokenDTO,
  LocalLoginDTO,
  LocalRegisterDTO,
  ReissueAccessJWTTokenDTO,
  UserInfoDTO,
  VerifyAccessJWTTokenDTO,
} from '../DTO/auth/auth.dto';

export interface AuthService {
  LocalLogin(request: LocalLoginDTO): Observable<JWTTokenDTO>;
  LocalRegister(request: LocalRegisterDTO): Observable<GrpcStatusDTO>;
  VerifyAccessJWTToken(
    request: VerifyAccessJWTTokenDTO,
  ): Observable<UserInfoDTO>;
  ReissueAccessJWTToken(
    request: ReissueAccessJWTTokenDTO,
  ): Observable<AccessJWTTokenDTO>;
}
