import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { USER_SERVICE_CLIENT } from './grpc-clients';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE_CLIENT,
        transport: Transport.GRPC,
        options: {
          package: 'user.v1',
          protoPath: join(process.cwd(), 'proto/user/v1/user.proto'),
          url: process.env.USER_SERVICE_URL ?? 'localhost:50051',
        }
      },
    ]),
  ],
  controllers: [OrdersController]
})
export class AppModule {}
