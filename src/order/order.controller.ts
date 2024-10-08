import { Controller, Get, Header, Headers, Patch, Post, Put, Res } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService:OrderService
  ) {}

  @Get('/')
  getOrder(@Headers('tokenAuthorization') tokenAuthorization:any, @Res({ passthrough: true }) responseReq):any {
    return this.orderService.getOrder(tokenAuthorization, responseReq);  
  }
  
  @Get(':id')
  getOrderId(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id:any) {
    return this.orderService.getOrderId(tokenAuthorization, id);
  }

  @Post('create')
  createOrder(@Headers('tokenAuthorization') tokenAuthorization:any, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(tokenAuthorization, createOrderDto);
  }

  @Delete(':id')
  deleteOrder(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id: string, @Res({ passthrough: true }) responseReq) {
    return this.orderService.deleteOrder(tokenAuthorization, id, responseReq);
  }

  @Put(':id')
  updateOrder(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id: any, @Body() updateOrderDto: UpdateOrderDto, @Res({ passthrough: true }) responseReq) {
    return this.orderService.updateOrder(tokenAuthorization, id, updateOrderDto, responseReq);
  }

}
