import { GrpcStatusDTO, JWTTokenDTO, LocalLoginDTO, LocalRegisterDTO } from '../domain/DTO/auth.dto';


export interface AuthGrpcService {
  LocalLogin(request : LocalLoginDTO) : Promise<JWTTokenDTO>
  LocalRegister(request: LocalRegisterDTO) : Promise<GrpcStatusDTO>
}