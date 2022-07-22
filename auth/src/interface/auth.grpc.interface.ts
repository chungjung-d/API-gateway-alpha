import { GrpcStatusDTO, JWTTokenDTO, LocalLoginDTO, LocalRegisterDTO } from './DTO/auth.dto';


export interface AuthGrpcInterface {
  LocalLogin(request : LocalLoginDTO) : Promise<JWTTokenDTO>
  LocalRegister(request: LocalRegisterDTO) : Promise<GrpcStatusDTO>
}