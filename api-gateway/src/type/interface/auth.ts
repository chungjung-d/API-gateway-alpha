import { Observable } from 'rxjs';

export interface LocalLoginData {
  id : string
  ps : string
}

export interface JWTToken {
  accessToken :string
  refreshToken : string
}

export interface AuthService {
  LocalLogin(request : LocalLoginData) : Observable<JWTToken>
}