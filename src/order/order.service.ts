import { Injectable, Inject, HttpCode } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    private authService: AuthService,
  ) {}

  async getOrder(access_token:any): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      return this.orderRepository.find(); 
    }
    return tokenValidate;
  }

  async getOrderId(access_token:any, id: any): Promise<Order> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      return this.orderRepository.findOneBy({ id });
    }
    return tokenValidate;
    }

  async createOrder(access_token:any, createOrderDto: CreateOrderDto): Promise<Order> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      const order: Order = new Order();
      order.client_name = createOrderDto.client_name;
      order.client_phone = createOrderDto.client_phone;
      order.address = createOrderDto.address;
      order.service_type = createOrderDto.service_type;
      order.labor_price = createOrderDto.labor_price;
      order.amount = createOrderDto.amount;
      order.materials = createOrderDto.materials
      order.user_id = tokenValidate.user_id;

      return this.orderRepository.save(order);
    }

    return tokenValidate;
  }

  async deleteOrder(access_token:any, id: string, responseReq): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      const response:any = await this.orderRepository.delete(id);

      if (response.affected == 1){
        return {
          "message": 'The order was removed successfully!',
          "status": 200
        }
      };

      if (response.affected == 0){
        responseReq.status(404);
        return {
          "message": 'Error! The order was not removed. Please, check the orderId',
          "status": 404
        }
      };
    }
    return tokenValidate; 
  }
  
  async updateOrder(access_token:any, id: any, updateOrderDto: UpdateOrderDto, responseReq): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      const order: Order = new Order();
      order.client_name = updateOrderDto.client_name;
      order.client_phone = updateOrderDto.client_phone;
      order.address = updateOrderDto.address;
      order.service_type = updateOrderDto.service_type;
      order.labor_price = updateOrderDto.labor_price;
      order.amount = updateOrderDto.amount;
      order.materials = updateOrderDto.materials

      const response:any = await this.orderRepository.update(id, order);

      if (response.affected == 1){
        return {
          "message": 'The order was updated successfully!',
          "status": 200
        }
      };

      if (response.affected == 0){
        responseReq.status(304);
        return {
          "message": 'Error! The order was not updated!',
          "status": 304
        }
      };
    }
    return tokenValidate; 
  }


}