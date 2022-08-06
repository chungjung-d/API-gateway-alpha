import { Observable } from 'rxjs';
import { CreateUserInfoDTO } from '../DTO/user/user.dto';

export interface UserService {
  CreateUserInfo(request: CreateUserInfoDTO): Observable<void>;
}
