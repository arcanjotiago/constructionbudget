import { Injectable, Inject} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Order } from 'src/order/order.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReportService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async getReportByUser(access_token:any, user_id: any, responseReq): Promise<any> {
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

  async postReportCosts(access_token:any, reportData:any, responseReq): Promise<any> {
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

      if(reportData.reportType == 'day'){
        const response:any = await this.orderRepository.query(`SELECT SUM(labor_price) FROM public.order WHERE created_at::timestamp::date = '${reportData.date}' `)
        
        if(response[0].sum == null){
          responseReq.status(404);
          return {"message": `The date informed is not available! Please, send a valid date!`}
        }

        return {
          "message":`The total profit per day is ${response[0].sum}`
        };
      }
      
      if(reportData.reportType == 'month'){
        const response:any = await this.orderRepository.query(`SELECT SUM(labor_price) FROM public.order WHERE created_at::timestamp::date >= '${reportData.initialDate}' AND created_at::timestamp::date <= '${reportData.finalDate}' `)
        
        if(response[0].sum == null){
          responseReq.status(404);
          return {"message": `The month informed is not available! Please, send a valid period!`}
        }

        return {
          "message":`The total profit per month is ${response[0].sum}`
        };
      }

      if(reportData.reportType == 'year'){
        const response:any = await this.orderRepository.query(`SELECT SUM(labor_price) FROM public.order WHERE created_at::timestamp::date >= '${reportData.initialDate}' AND created_at::timestamp::date <= '${reportData.finalDate}' `)
        
        if(response[0].sum == null){
          responseReq.status(404);
          return {"message": `The year informed is not available! Please, send a valid period!`}
        }

        return {
          "message":`The total profit per year is ${response[0].sum}`
        };
      }

    }
    
    return tokenValidate;
  }

}