import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { authProviders } from 'src/auth/auth.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers:[ReportController],
  providers: [...reportProviders, ReportService, ...authProviders],
  exports:[ReportService]
})
export class ReportModule {}