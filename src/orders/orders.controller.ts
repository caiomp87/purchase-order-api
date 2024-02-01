import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    return this.ordersService.create({
      ...createOrderDto,
      clientId: req['user'].sub,
    });
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.ordersService.findAll(req['user'].sub);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: Request) {
    return this.ordersService.findOne(id, req['user'].sub);
  }
}
