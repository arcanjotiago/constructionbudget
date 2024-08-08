import { Controller, Get, Headers} from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ReportService } from './report.service';


@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService:ReportService
  ) {}

  @Get(':userid')
  getReportByUser(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('userid') userId:any) {
    return this.reportService.getReportByUser(tokenAuthorization, userId);
  }

}


