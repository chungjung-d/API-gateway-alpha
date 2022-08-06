import { Module } from '@nestjs/common';
import { AuthModule } from './domain/module/auth.module';
import { VerifyAccessJwtInterceptor } from './application/interceptor/verify-access-jwt.interceptor';
import { HttpModule, HttpService } from '@nestjs/axios';
import { UserModule } from './domain/module/user.module';

const interceptor = [VerifyAccessJwtInterceptor];

@Module({
  imports: [AuthModule, UserModule, HttpModule],
  providers: [...interceptor],
  exports: [...interceptor],
})
export class AppModule {}
