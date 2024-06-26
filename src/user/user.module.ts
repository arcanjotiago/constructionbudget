import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { authProviders } from 'src/auth/auth.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers:[UserController],
  providers: [...userProviders, UserService, ...authProviders],
  exports:[UserService]
})
export class UserModule {}