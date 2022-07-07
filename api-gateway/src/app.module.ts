import { Module } from '@nestjs/common';
import { PublicModule } from './public/public.module';

@Module({
  imports: [PublicModule],
})
export class AppModule {}
