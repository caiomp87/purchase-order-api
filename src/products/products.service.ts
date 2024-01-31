import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productToCreate = this.productRepository.create(createProductDto);
    const product = await this.productRepository.save(productToCreate);

    return { product };
  }

  async findAll() {
    const products = await this.productRepository.find();
    return { products };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    return { product };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update({ id }, updateProductDto);
  }

  async remove(id: string) {
    return await this.productRepository.delete({ id });
  }
}
