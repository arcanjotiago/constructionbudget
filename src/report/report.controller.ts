import { Body, Controller, Get, Headers, Post, Res} from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ReportService } from './report.service';


@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService:ReportService
  ) {}

  @Get(':userid')
  getReportByUser(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('userid') userId:any, @Res({ passthrough: true }) responseReq) {
    return this.reportService.getReportByUser(tokenAuthorization, userId, responseReq);
  }

  @Post('costs')
  postReportCosts(@Headers('tokenAuthorization') tokenAuthorization:any, @Body() reportData:any, @Res({ passthrough: true }) responseReq) {
    return this.reportService.postReportCosts(tokenAuthorization, reportData, responseReq);
  }

}


