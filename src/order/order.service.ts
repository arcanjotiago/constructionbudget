import { Injectable, Inject } from '@nestjs/common';
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
    const getUserAccessToken:any = await this.authService.checkUserAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      const order: Order = new Order();
      order.client_name = createOrderDto.client_name;
      order.client_phone = createOrderDto.client_phone;
      order.address = createOrderDto.address;
      order.service_type = createOrderDto.service_type;
      order.labor_price = createOrderDto.labor_price;
      order.amount = createOrderDto.amount;
      order.materials = createOrderDto.materials
      order.user_id = getUserAccessToken.user_id;

      return this.orderRepository.save(order);
      
    }
    return tokenValidate;

  }

  async deleteOrder(access_token:any, id: string): Promise<{ affected?: number }> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      return this.orderRepository.delete(id);
    }
    return tokenValidate; 
  }
  
  async updateOrder(access_token:any, id: any, updateOrderDto: UpdateOrderDto): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      const order: Order = new Order();
      order.client_name = updateOrderDto.client_name;
    //   user.email = updateUserDto.email;
    //   user.password = updateUserDto.password;
    //   user.access_token = updateUserDto.access_token;
      return this.orderRepository.update(id, order)
    }
    return tokenValidate; 
  }


}