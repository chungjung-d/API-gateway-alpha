import { Observable } from 'rxjs';
import {
  AccessJWTTokenDTO,
  JWTTokenDTO,
  LocalLoginDTO,
  LocalRegisterDTO,
  ReissueAccessJWTTokenDTO,
  UserInfoDTO,
  VerifyAccessJWTTokenDTO,
} from '../DTO/auth/auth.dto';

export interface AuthService {
  LocalLogin(request: LocalLoginDTO): Observable<JWTTokenDTO>;
  LocalRegister(request: LocalRegisterDTO): Observable<void>;
  VerifyAccessJWTToken(
    request: VerifyAccessJWTTokenDTO,
  ): Observable<UserInfoDTO>;
  ReissueAccessJWTToken(
    request: ReissueAccessJWTTokenDTO,
  ): Observable<AccessJWTTokenDTO>;
}
