import { Injectable } from '@nestjs/common';
import { HealthCheckResponse } from '../../domain/entities/health-check-response.entity';

@Injectable()
export class HealthService {
  private readonly startTime: number = Date.now();
  private readonly version: string = '1.0.0';

  getHealth(includeServices = false): HealthCheckResponse {
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);
    const status: 'healthy' | 'unhealthy' | 'degraded' = 'healthy';

    const services = includeServices
      ? {
          database: 'healthy' as const,
          cache: 'healthy' as const,
        }
      : undefined;

    return new HealthCheckResponse(
      status,
      new Date().toISOString(),
      uptime,
      this.version,
      services,
    );
  }

  getUptime(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }
}

