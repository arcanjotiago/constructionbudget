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

//   async getUserEmail(email: any): Promise<any> {
//     const checkEmailDuplicate = await this.userRepository.findOneBy( {email} );

//     if(checkEmailDuplicate != null){
//       if (checkEmailDuplicate.email == email){
//         return {
//           "message": "The email informed has used!, please! send the new email on requisition!",
//           "status": 401
//         }
//       }
//     }
//     return {
//       "message": "The send email not exist in database!",
//       "status": 200
//     }   
//   }
    
    async createOrder(access_token:any, createOrderDto: CreateOrderDto): Promise<Order> {

    //   const validateMail = await this.getUserEmail(createUserDto.email);
    //   if(validateMail.status == 401){
    //     return validateMail;
    //   };
      
      const order: Order = new Order();
      order.client_name = createOrderDto.client_name;
    //   user.email = createUserDto.email;
    //   user.password = createUserDto.password;
      return this.orderRepository.save(order);

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