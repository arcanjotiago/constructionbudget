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

      if(user_id == ':userid' || user_id == undefined || user_id == 'null'){
        return {
          "message":"Error! Please, inform the user id on parameters requisition!",
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

  async getReportCosts(access_token:any, reportType:string, date:string, initialDate:string, finalDate:string, responseReq): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      const checkRoleUser:any = await this.userService.getUserRole(access_token, tokenValidate.user_id);

      if (checkRoleUser.role != 'administrator'){
        responseReq.status(401);
        return{
          "message": `Access denied. You must be an administrator to access this endpoint`,
          "status": 401
        }
      }

      if (reportType == undefined){
        return {
          "message": `The field 'reportType' must be filed with the (day, year or month). Please send a valid type!`,
          "status": 400 
        }
      }

      if (reportType == 'day'){
        if(date == undefined){
          return{
            "message": `The field 'date' must be filed with the date in format yyyy-mm-dd. Please send a valid date!`,
            "status": 400
          }
        };
        
        const response:any = await this.orderRepository.query(
          `SELECT SUM(labor_price) FROM public.order WHERE created_at::timestamp::date = '${date}' `
        )
        
        if(response[0].sum == null){
          responseReq.status(404);
          return {"message": `The date informed is not available! Please, send a valid date!`}
        }

        return {
          "message":`The total profit per day is ${response[0].sum}`
        };
      }
      

      if (reportType == 'month'){
        if(initialDate == undefined || finalDate == undefined){
          return{
            "message": `The field 'initialDate' and 'finalDate' must be filed with the date in format yyyy-mm-dd. Please send a valid date!`,
            "status": 400
          }
        }
        
        const response:any = await this.orderRepository.query(
          `SELECT SUM(labor_price) FROM public.order WHERE created_at::timestamp::date >= '${initialDate}' AND created_at::timestamp::date <= '${finalDate}' `
        )
        
        if(response[0].sum == null){
          responseReq.status(404);
          return {"message": `The month informed is not available! Please, send a valid period!`}
        }

        return {
          "message":`The total profit per month is ${response[0].sum}`
        };
      }


      if (reportType == 'year'){
        if(initialDate == undefined || finalDate == undefined){
          return{
            "message": `The field 'initialDate' and 'finalDate' must be filed with the date in format yyyy-mm-dd. Please send a valid date!`,
            "status": 400
          }
        }
        
        const response:any = await this.orderRepository.query(
          `SELECT SUM(labor_price) FROM public.order WHERE created_at::timestamp::date >= '${initialDate}' AND created_at::timestamp::date <= '${finalDate}' `
        )
        
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