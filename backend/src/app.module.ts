import { Module } from '@nestjs/common';
import { ConfigModule } from './infrastructure/config/config.module';
import { HealthModule } from './presentation/controllers/health.module';

@Module({
  imports: [ConfigModule, HealthModule],
})
export class AppModule {}

