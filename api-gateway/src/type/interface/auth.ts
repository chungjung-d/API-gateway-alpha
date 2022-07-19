import { Observable } from 'rxjs';

export interface LocalLoginData {
  userEmailId : string
  userPassword : string
}

export interface JWTToken {
  accessToken :string
  refreshToken : string
}

export interface AuthService {
  LocalLogin(request : LocalLoginData) : Observable<JWTToken>

}