import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'http://localhost:4000',
      package: 'auth',
      protoPath: join(__dirname, './_proto/auth.proto'),
    },
  });
  await app.listen()
}

bootstrap();
