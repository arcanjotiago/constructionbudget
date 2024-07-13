import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { authProviders } from 'src/auth/auth.providers';
import { AuthModule } from 'src/auth/auth.module';
import { MaterialController } from './material.controller';
import { materialProviders } from './material.providers';
import { MaterialService } from './material.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers:[MaterialController],
  providers: [...materialProviders, MaterialService, ...authProviders],
  exports:[MaterialService]
})
export class MaterialModule {}