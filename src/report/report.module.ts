import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { authProviders } from 'src/auth/auth.providers';
import { AuthModule } from 'src/auth/auth.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { orderProviders } from 'src/order/order.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers:[ReportController],
  providers: [ReportService, ...orderProviders, ...authProviders],
  exports:[ReportService]
})
export class ReportModule {}