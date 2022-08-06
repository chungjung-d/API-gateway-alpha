import { CreateUserInfoDTO } from '../../interface/DTO/user.dto';

export interface UserInfoGrpcInterface {
  createUserInfo(request: CreateUserInfoDTO): Promise<void>;
}
