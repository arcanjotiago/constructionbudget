import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { authProviders } from 'src/auth/auth.providers';
import { AuthModule } from 'src/auth/auth.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderProviders } from './order.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers:[OrderController],
  providers: [...orderProviders, OrderService, ...authProviders],
  exports:[OrderService]
})
export class OrderModule {}