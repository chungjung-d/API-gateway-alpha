import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientAuth: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:3200',
    package: 'user',
    protoPath: join(__dirname, '../proto/user.proto'),
    loader: { keepCase: true },
  },
};
