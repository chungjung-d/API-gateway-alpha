import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { UserService } from '../../infrastructure/grpc/interface/user';
import { CreateUserInfoDTO } from '../../infrastructure/grpc/DTO/user/user.dto';
import { grpcClientUser } from '../../infrastructure/grpc/client/user.client';

@Injectable()
export class UserBusiness implements OnModuleInit {
  @Client(grpcClientUser)
  private readonly grpcClientUser: ClientGrpc;

  private userService: UserService;

  onModuleInit() {
    this.userService =
      this.grpcClientUser.getService<UserService>('UserService');
  }

  async createUserInfo(createUserInfoDTO: CreateUserInfoDTO): Promise<void> {
    await this.userService.CreateUserInfo(createUserInfoDTO).toPromise();
  }
}
