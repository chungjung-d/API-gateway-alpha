import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '127.0.0.1:3200',
        package: 'user',
        protoPath: join(__dirname, '/interface/proto/user.proto'),
        loader: { keepCase: true },
      },
    },
  );
  await app.listen();
}

bootstrap();
