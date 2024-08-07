import { Injectable, Inject} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ReportService {
  constructor(
    @Inject('MATERIAL_REPOSITORY')
    private reportRepository: Repository<Report>,
    private authService: AuthService,
  ) {}

  // async getReport(access_token:any): Promise<any> {
  //   const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
  //   if (tokenValidate.status == 200){
  //     return this.reportRepository.find(); 
  //   }

  //   return tokenValidate;
  // }

  async getReportId(access_token:any, id: any): Promise<Report> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      return this.reportRepository.findOneBy({ id });
    }
    return tokenValidate;
  }

  async getReportUserId(access_token:any, userId: any): Promise<Report> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      return this.reportRepository.findOneBy({ userId });
    }
    return tokenValidate;
  }

  // async getReportByName(access_token:any, reportName: any): Promise<any> {
  //   const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
  //   if (tokenValidate.status == 200){
  //     const getReportDatabase:any = await this.reportRepository.query(`SELECT * FROM public.report WHERE public.report.name like '%${reportName.name}%' `)

  //     return getReportDatabase;    
  //   }
  //   return tokenValidate;
  // }

  // async createReport(access_token:any, createReportDto: CreateReportDto): Promise<any> {
  //   const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
  //   if (tokenValidate.status == 200){
  //     const report: Report = new Report();
  //     report.name = createReportDto.name;
  //     report.description = createReportDto.description;
  //     report.value = createReportDto.value;
  //     report.quantity = createReportDto.quantity;
      
  //     return this.reportRepository.save(report);    
  //   }
    
  //   return tokenValidate;
  // }

  // async deleteReport(access_token:any, id: string, responseReq): Promise<any> {
  //   const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
  //   if (tokenValidate.status == 200){
  //     const response:any = await this.reportRepository.delete(id);
      
  //     if (response.affected == 1){
  //       return {
  //         "message": 'The report was removed successfully!',
  //         "status": 200
  //       }
  //     };

  //     if (response.affected == 0){
  //       responseReq.status(404);
  //       return {
  //         "message": 'Error! The report was not removed. Please, check the reportId',
  //         "status": 404
  //       }
  //     }; 
  //   }
  //   return tokenValidate; 
  // }
  
  // async updateReport(access_token:any, id: any, updateReportDto: UpdateReportDto, responseReq): Promise<any> {
  //   const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
  //   if (tokenValidate.status == 200){
  //     const report: Report = new Report();
  //     report.name = updateReportDto.name;
  //     report.description = updateReportDto.description;
  //     report.value = updateReportDto.value;
  //     report.quantity = updateReportDto.quantity;
  //     const response:any = await this.reportRepository.update(id, report);

  //     if(response.affected == 1){
  //       return {
  //         "status": 200,
  //         "message": `The report ${report.name} was updated successfully!!`
  //       }
  //     }

  //     if (response.affected == 0){
  //       responseReq.status(304);
  //       return {
  //         "message": `Error! The report ${report.name} was not updated!`,
  //         "status": 304
  //       }
  //     };

  //   }
  //   return tokenValidate; 
  // }

}