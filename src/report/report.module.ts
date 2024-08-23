import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { authProviders } from 'src/auth/auth.providers';
import { AuthModule } from 'src/auth/auth.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { orderProviders } from 'src/order/order.providers';
import { UserModule } from 'src/user/user.module';
import { userProviders } from 'src/user/user.providers';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers:[ReportController],
  providers: [ReportService, ...orderProviders, ...authProviders, ...userProviders],
  exports:[ReportService]
})
export class ReportModule {}