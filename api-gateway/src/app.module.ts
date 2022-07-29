import { Module } from '@nestjs/common';
import { AuthModule } from './domain/module/auth.module';

@Module({
  imports: [AuthModule],
  providers: [],
})
export class AppModule {}
