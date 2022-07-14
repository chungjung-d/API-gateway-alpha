import { JWTTokenDTO } from '../domain/DTO/response';
import { LocalLoginDTO } from '../domain/DTO/request';

export interface AuthGrpcService {
  LocalLogin(request : LocalLoginDTO) : Promise<JWTTokenDTO>
}