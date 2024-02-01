import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
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
      clientId: 1,
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

    return this.orderRepository.save(order);
  }

  findAll() {
    const orders = this.orderRepository.find();
    return { orders };
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
