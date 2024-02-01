import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private amqpConnection: AmqpConnection,
  ) {}

  async create(createOrderDto: CreateOrderDto & { clientId: number }) {
    const productIds = createOrderDto.items.map((item) => item.productId);
    const uniqueProductIds = [...new Set(productIds)];

    const products = await this.productRepository.find({
      where: {
        id: In(uniqueProductIds),
      },
    });

    if (products.length !== uniqueProductIds.length) {
      throw new Error('Some products does not exists');
    }

    const order = Order.create({
      clientId: createOrderDto.clientId,
      items: createOrderDto.items.map((item) => {
        const product = products.find(
          (product) => product.id === item.productId,
        );
        return {
          price: product.price,
          productId: item.productId,
          quantity: item.quantity,
        };
      }),
    });

    const createdOrder = await this.orderRepository.save(order);

    await this.amqpConnection.publish('amq.direct', 'OrderCreated', {
      orderId: order.id,
      cardHash: createOrderDto.cardHash,
      total: order.total,
    });

    return { order: createdOrder };
  }

  async findAll(clientId: number) {
    const orders = await this.orderRepository.find({
      where: { clientId },
      order: { createdAt: 'DESC' },
    });

    return { orders };
  }

  async findOne(id: number, clientId: number) {
    const order = await this.orderRepository.findOneByOrFail({
      id,
      clientId,
    });

    return { order };
  }
}
