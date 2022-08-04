import { Module } from '@nestjs/common';
import { UserController } from './interface/conrtroller/user.controller';
import { UserInfoFactory } from './domin/interface/user-info.class';
import { UserInfoRepository } from './infrastructure/repository/user-info.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';

const factory = [UserInfoFactory];
const repository = [UserInfoRepository];

@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [UserController],
  providers: [...factory, ...repository],
})
export class UserModule {}
