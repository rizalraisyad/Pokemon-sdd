import { Module } from '@nestjs/common';
import { ConfigModule } from './infrastructure/config/config.module';
import { HealthModule } from './presentation/controllers/health.module';
import { PokemonModule } from './presentation/controllers/pokemon.module';
import { CacheModule } from './infrastructure/cache/cache.module';

@Module({
  imports: [
    ConfigModule,
    HealthModule,
    CacheModule,
    PokemonModule,
  ],
})
export class AppModule {}

