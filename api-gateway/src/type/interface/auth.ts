import { Observable } from 'rxjs';

export interface LocalLoginData {
  id : string
  ps : string
}

export interface JWTToken {
  access_token : string
  refresh_token : string
}

export interface AuthService {
  LocalLogin(data : LocalLoginData) : Observable<JWTToken>
}