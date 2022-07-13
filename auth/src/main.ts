import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '127.0.0.1:3100',
      package: 'auth',
      protoPath: join(__dirname, '/domain/proto/auth.proto'),
      loader: { keepCase: true },
    },
  });
  await app.listen()
}

bootstrap();
