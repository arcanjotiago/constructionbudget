import { Injectable, Inject} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Order } from 'src/order/order.entity';

@Injectable()
export class ReportService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    private authService: AuthService,
  ) {}

  async getReportByUser(access_token:any, user_id: any): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      if(user_id == ':userid'){
        return {
          "message":"Please, inform the user id!",
          "status":400
        }
      }

      const response:any = await this.orderRepository.findBy({ user_id });

      if (response == ''){
        return {
          "message":"There was no data for user informed!",
          "status":404
        }
      }

      return response;
    }

    return tokenValidate;
  }

  async postReportCosts(access_token:any, date:any): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      
      const response:any = await this.orderRepository.query(`SELECT * FROM public.order WHERE created_at::timestamp::date = '${date.date}' `)

      let calc = 0;
      // Aqui vou ter que varrer o array retornado e somar o campo amount
      for(let i=0; i < response.length; i++){
        // const x = +response[i].amount;
        // calc = ( calc + x );
        console.log(response[i].amount);
      }


      // return calc;
      return response;
    }
    
    return tokenValidate;
  }

}