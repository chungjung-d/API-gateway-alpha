import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        type: 'postgres',
        host: configService.get('POSTGRES_DATABASE_HOST'),
        port: configService.get('POSTGRES_DATABASE_PORT'),
        username: configService.get('POSTGRES_DATABASE_USERNAME'),
        password: configService.get('POSTGRES_DATABASE_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE_NAME'),
        entities: [],
        synchronize: true,
      };
    },
  }),
  ]
})

export class DatabaseModule {}