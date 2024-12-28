import { Param, Controller, Get, Headers, Query, Res} from '@nestjs/common';
import { ReportService } from './report.service';


@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService:ReportService
  ) {}

  @Get('costs')
  getReportCosts(@Headers('tokenAuthorization') tokenAuthorization:any,  @Query('reportType') reportType:string, @Query('date') date:string, @Query('initialDate') initialDate:string, @Query('finalDate') finalDate:string, @Res({ passthrough: true }) responseReq) {
    return this.reportService.getReportCosts(tokenAuthorization, reportType, date, initialDate, finalDate, responseReq);
  }
  
  @Get(':userid')
  getReportByUser(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('userid') userId:any, @Res({ passthrough: true }) responseReq) {
    return this.reportService.getReportByUser(tokenAuthorization, userId, responseReq);
  }

}


