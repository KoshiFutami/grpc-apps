import { Controller, Get, Inject, NotFoundException, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { USER_SERVICE_CLIENT } from './grpc-clients';

type Order = {
  orderId: string;
  userId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
};

type User = {
  userId: string;
  name: string;
  email: string;
};

type GetUserResponse = {
  user?: User;
};

interface UserServiceClient {
  getUser(request: { userId: string }): Observable<GetUserResponse>;
}

type OrderResponse = Order & {
  user: User;
};

const orders: Record<string, Order> = {
  'order-1': {
    orderId: 'order-1',
    userId: 'user-1',
    itemName: 'Coffee beans',
    quantity: 2,
    unitPrice: 1200
  },
  'order-2': {
    orderId: 'order-2',
    userId: 'user-2',
    itemName: 'Drip kettle',
    quantity: 1,
    unitPrice: 4800
  }
};

@Controller('orders')
export class OrdersController implements OnModuleInit {
  private userService!: UserServiceClient;

  constructor(@Inject(USER_SERVICE_CLIENT) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  @Get()
  listOrders(): Order[] {
    return Object.values(orders);
  }

  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: string): Promise<OrderResponse> {
    const order = orders[orderId];
    if (!order) {
      throw new NotFoundException(`order ${orderId} was not found`);
    }

    const response = await firstValueFrom(
      this.userService.getUser({ userId: order.userId })
    );
    if (!response.user) {
      throw new NotFoundException(`user ${order.userId} was not found`);
    }

    return {
      ...order,
      user: response.user
    };
  }
}
