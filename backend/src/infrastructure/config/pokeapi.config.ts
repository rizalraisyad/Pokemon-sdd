import { Injectable } from '@nestjs/common';
import { AppConfigService } from './app.config';

@Injectable()
export class PokeApiConfig {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private readonly configService: AppConfigService) {}

  getBaseUrl(): string {
    return process.env.POKEAPI_BASE_URL || this.baseUrl;
  }

  getTimeout(): number {
    return parseInt(process.env.POKEAPI_TIMEOUT || '10000', 10);
  }

  getRateLimitPerSecond(): number {
    return parseInt(process.env.POKEAPI_RATE_LIMIT || '100', 10);
  }
}

