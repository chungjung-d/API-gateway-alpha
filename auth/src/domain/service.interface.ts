import { JWTTokenDTO } from './DTO/response';
import { LocalLoginDTO } from './DTO/request';

export interface AuthService {
  LocalLogin(request : LocalLoginDTO) : Promise<JWTTokenDTO>
}