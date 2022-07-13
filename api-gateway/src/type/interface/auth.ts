import { Observable } from 'rxjs';

export interface LocalLoginData {
  id : string
  password : string
}

export interface JWTToken {
  accessToken :string
  refreshToken : string
}

export interface AuthService {
  LocalLogin(request : LocalLoginData) : Observable<JWTToken>
}