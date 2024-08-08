import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { OrderModule } from './order/order.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [UserModule, AuthModule, MaterialModule, OrderModule, ReportModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}