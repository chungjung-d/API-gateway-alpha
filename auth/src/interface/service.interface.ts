import { JWTToken, LocalLoginData } from './type/login';

export interface AuthService {
  LocalLogin(request : LocalLoginData) : Promise<JWTToken>
}