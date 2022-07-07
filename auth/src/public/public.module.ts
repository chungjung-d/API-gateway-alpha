import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';

@Module({
  imports: [LoginModule],
  controllers: [],
  providers: [],
})
export class PublicModule {}
