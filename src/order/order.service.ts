import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async getOrder(access_token:any, responseReq): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      const checkRoleUser:any = await this.userService.getUserRole(access_token, tokenValidate.user_id);

      if(checkRoleUser.role != 'administrator'){
        responseReq.status(401);
        return{
          "message": `Access denied. You must be an administrator to access this endpoint`,
          "status": 401
        }
      }
      
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
      let splitMaterialIds = '';
      let resultSplit = ''
      
      for(let i=0; i<createOrderDto.materials.length; i++){
        
          resultSplit = resultSplit + splitMaterialIds.concat(`'`, createOrderDto.materials[i], `'`, `,`) 
      }

      const listMaterialIds = resultSplit.substring(0, resultSplit.length - 1) 
      const calcValueMaterials:any = await this.orderRepository.query(`SELECT SUM(value) FROM public.material WHERE id IN (${listMaterialIds}) `)

      const materialValue = calcValueMaterials[0].sum ;
      const convertMaterialValue =  materialValue.replace("R$", '').replace(",", '.');
      const calcAmount:any = (parseFloat(createOrderDto.labor_price)) + (parseFloat(convertMaterialValue));
      
      const order: Order = new Order();
      order.client_name = createOrderDto.client_name;
      order.client_phone = createOrderDto.client_phone;
      order.address = createOrderDto.address;
      order.service_type = createOrderDto.service_type;
      order.labor_price = createOrderDto.labor_price;
      order.amount =  calcAmount;
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