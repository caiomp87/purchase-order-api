import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get(getDataSourceToken());
  await dataSource.synchronize(true);

  const productRepository = dataSource.getRepository('Product');
  await productRepository.insert([
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      imageUrl: 'http://localhost:9000/products/1.png',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      imageUrl: 'http://localhost:9000/products/2.png',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
      imageUrl: 'http://localhost:9000/products/3.png',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description 4',
      price: 400,
      imageUrl: 'http://localhost:9000/products/4.png',
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description 5',
      price: 500,
      imageUrl: 'http://localhost:9000/products/5.png',
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description 6',
      price: 600,
      imageUrl: 'http://localhost:9000/products/6.png',
    },
    {
      id: 7,
      name: 'Product 7',
      description: 'Description 7',
      price: 700,
      imageUrl: 'http://localhost:9000/products/7.png',
    },
    {
      id: 8,
      name: 'Product 8',
      description: 'Description 8',
      price: 800,
      imageUrl: 'http://localhost:9000/products/8.png',
    },
    {
      id: 9,
      name: 'Product 9',
      description: 'Description 9',
      price: 900,
      imageUrl: 'http://localhost:9000/products/9.png',
    },
    {
      id: 10,
      name: 'Product 10',
      description: 'Description 10',
      price: 1000,
      imageUrl: 'http://localhost:9000/products/10.png',
    },
    {
      id: 11,
      name: 'Product 11',
      description: 'Description 11',
      price: 1100,
      imageUrl: 'http://localhost:9000/products/11.png',
    },
    {
      id: 12,
      name: 'Product 12',
      description: 'Description 12',
      price: 1200,
      imageUrl: 'http://localhost:9000/products/12.png',
    },
    {
      id: 13,
      name: 'Product 13',
      description: 'Description 13',
      price: 1300,
      imageUrl: 'http://localhost:9000/products/13.png',
    },
    {
      id: 14,
      name: 'Product 14',
      description: 'Description 14',
      price: 1400,
      imageUrl: 'http://localhost:9000/products/14.png',
    },
    {
      id: 15,
      name: 'Product 15',
      description: 'Description 15',
      price: 1500,
      imageUrl: 'http://localhost:9000/products/15.png',
    },
    {
      id: 16,
      name: 'Product 16',
      description: 'Description 16',
      price: 1600,
      imageUrl: 'http://localhost:9000/products/16.png',
    },
    {
      id: 17,
      name: 'Product 17',
      description: 'Description 17',
      price: 1700,
      imageUrl: 'http://localhost:9000/products/17.png',
    },
    {
      id: 18,
      name: 'Product 18',
      description: 'Description 18',
      price: 1800,
      imageUrl: 'http://localhost:9000/products/18.png',
    },
    {
      id: 19,
      name: 'Product 19',
      description: 'Description 19',
      price: 1900,
      imageUrl: 'http://localhost:9000/products/19.png',
    },
    {
      id: 20,
      name: 'Product 20',
      description: 'Description 20',
      price: 2000,
      imageUrl: 'http://localhost:9000/products/20.png',
    },
  ]);

  await app.close();
}
bootstrap();
