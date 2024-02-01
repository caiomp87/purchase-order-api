import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export type CreateOrderCommand = {
  clientId: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
};

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ name: 'client_id' })
  clientId: number;

  @Column()
  status: OrderStatus = OrderStatus.PENDING;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: ['insert'] })
  items: OrderItem[];

  //
  static create(input: CreateOrderCommand) {
    const order = new Order();
    order.clientId = input.clientId;
    order.items = input.items.map((item) => {
      const orderItem = new OrderItem();
      orderItem.quantity = item.quantity;
      orderItem.productId = item.productId;
      orderItem.price = item.price;
      return orderItem;
    });

    order.total = order.items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    return order;
  }
}
