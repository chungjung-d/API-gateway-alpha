import { Controller } from '@nestjs/common';
import { UserInfoGrpcInterface } from '../../domin/interface/user.grpc.controller.interface';
import { CreateUserInfoDTO } from '../DTO/user.dto';

@Controller('user')
export class UserController implements UserInfoGrpcInterface {
  createUserInfo(request: CreateUserInfoDTO): Promise<void> {
    return Promise.resolve(undefined);
  }
}
