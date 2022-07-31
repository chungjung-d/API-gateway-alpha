import { Module } from '@nestjs/common';
import { AuthModule } from './domain/module/auth.module';
import { VerifyAccessJwtInterceptor } from './application/interceptor/verify-access-jwt.interceptor';
import { HttpModule, HttpService } from '@nestjs/axios';

const interceptor = [VerifyAccessJwtInterceptor];

@Module({
  imports: [AuthModule, HttpModule],
  providers: [...interceptor],
  exports: [],
})
export class AppModule {}
