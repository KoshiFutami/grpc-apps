import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

type Order = {
  orderId: string;
  userId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
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
export class OrdersController {
  @Get()
  listOrders(): Order[] {
    return Object.values(orders);
  }

  @Get(':orderId')
  getOrder(@Param('orderId') orderId: string): Order {
    const order = orders[orderId];
    if (!order) {
      throw new NotFoundException(`order ${orderId} was not found`);
    }

    return order;
  }
}
