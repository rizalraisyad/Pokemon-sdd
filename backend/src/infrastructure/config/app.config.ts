import { Injectable } from '@nestjs/common';
import { AppConfig } from '../../domain/entities/app-config.entity';

@Injectable()
export class AppConfigService {
  private readonly config: AppConfig;

  constructor() {
    this.config = AppConfig.fromEnv(process.env as Record<string, string>);
  }

  getConfig(): AppConfig {
    return this.config;
  }

  getEnvironment(): string {
    return this.config.environment;
  }

  getPort(): number {
    return this.config.port;
  }

  getCorsOrigin(): string {
    return this.config.corsOrigin;
  }

  getLogLevel(): string {
    return this.config.logLevel;
  }

  getApiVersion(): string {
    return this.config.apiVersion;
  }

  isProduction(): boolean {
    return this.config.environment === 'production';
  }

  isDevelopment(): boolean {
    return this.config.environment === 'development';
  }
}

