import { Controller, Get, Headers, Post, Put, Res} from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ReportService } from './report.service';


@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService:ReportService
  ) {}

  // @Get('/')
  // getReport(@Headers('tokenAuthorization') tokenAuthorization:any):any {
  //   return this.reportService.getReport(tokenAuthorization);  
  // }
  
  @Get(':id')
  getReportId(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id:any) {
    return this.reportService.getReportId(tokenAuthorization, id);
  }

  @Get(':userid')
  getReportUserId(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('userid') userId:any) {
    return this.reportService.getReportId(tokenAuthorization, userId);
  }

  // @Post('name')
  // getReportByName(@Headers('tokenAuthorization') tokenAuthorization:any, @Body() reportName:any) {
  //   return this.reportService.getReportByName(tokenAuthorization, reportName);
  // }

  // @Post('create')
  // createReport(@Headers('tokenAuthorization') tokenAuthorization:any, @Body() createReportDto: CreateReportDto) {
  //   return this.reportService.createReport(tokenAuthorization, createReportDto);
  // }

  // @Delete(':id')
  // deleteReport(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id: string, @Res({ passthrough: true }) responseReq) {
  //   return this.reportService.deleteReport(tokenAuthorization, id, responseReq);
  // }

  // @Put(':id')
  // updateReport(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id: any, @Body() updateReportDto: UpdateReportDto, @Res({ passthrough: true }) responseReq) {
  //   return this.reportService.updateReport(tokenAuthorization, id, updateReportDto, responseReq);
  // }

}


