import { Controller } from '@nestjs/common';
import { UserInfoGrpcInterface } from '../../domin/interface/user.grpc.controller.interface';
import { CreateUserInfoDTO } from '../DTO/user.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserInfoCommand } from '../../application/command/create-user-info.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller()
export class UserController implements UserInfoGrpcInterface {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod('UserService', 'CreateUserInfo')
  async createUserInfo(request: CreateUserInfoDTO): Promise<void> {
    const createUserInfoCommandDTO = { userUUID: request.userUUID };
    const command: CreateUserInfoCommand = await new CreateUserInfoCommand(
      createUserInfoCommandDTO,
    );

    await this.commandBus.execute(command);
  }
}
