import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { BullmqModule } from './infrastructure/bullmq/bullmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : process.env.NODE_ENV === 'stage'
          ? '.stage.env'
          : '.develop.env',
    }),
    AuthModule,
    DatabaseModule,
    BullmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
