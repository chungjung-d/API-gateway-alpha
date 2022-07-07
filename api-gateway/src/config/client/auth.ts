import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientAuth: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:3100',
    package: 'auth',
    protoPath: join(__dirname, '/../../proto/auth.proto'),
  },
};