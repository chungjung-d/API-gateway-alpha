import { Module } from '@nestjs/common';
import { UserController } from './interface/conrtroller/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
