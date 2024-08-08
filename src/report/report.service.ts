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
      return this.orderRepository.findOneBy({ user_id });
    }
    return tokenValidate;
  }

}