import { Observable } from 'rxjs';

export interface LocalLoginData {
  userEmailId : string
  userPassword : string
}

export interface JWTToken {
  grpcStatus : number
  accessToken :string
  refreshToken : string
}

export interface LocalRegisterData {
  userEmailId : string
  userPassword : string
}

export interface GrpcStatusData{
  grpcStatus : number
}

export interface AuthService {
  LocalLogin(request : LocalLoginData) : Observable<JWTToken>
  LocalRegister(request: LocalRegisterData) : Observable<GrpcStatusData>
}