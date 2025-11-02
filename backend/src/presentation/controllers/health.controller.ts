import { Controller, Get, Query } from '@nestjs/common';
import { HealthService } from '../../application/services/health.service';
import { HealthCheckResponse } from '../../domain/entities/health-check-response.entity';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(
    @Query('includeServices') includeServices?: string,
  ): HealthCheckResponse {
    const include = includeServices === 'true';
    return this.healthService.getHealth(include);
  }
}

