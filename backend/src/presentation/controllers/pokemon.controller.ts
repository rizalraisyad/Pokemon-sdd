import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  UseInterceptors,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Pokemon } from '../../domain/entities/pokemon.entity';
import { PokemonService } from '../../application/services/pokemon.service';
import { PokemonQueryPipe } from '../pipes/pokemon-query.pipe';
import { PokemonResponseDto } from '../../application/dto/pokemon-response.dto';
import { ApiResponse } from '../../domain/entities/api-response.entity';
import { RequestLoggerInterceptor } from '../../infrastructure/logging/request-logger.interceptor';
import { ResponseLoggerInterceptor } from '../../infrastructure/logging/response-logger.interceptor';

@Controller('pokemon')
@UseInterceptors(RequestLoggerInterceptor, ResponseLoggerInterceptor)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @UsePipes(new PokemonQueryPipe())
  async getPokemonList(@Query() query: any, @Req() req: Request) {
    const result = await this.pokemonService.getPokemonList(query);
    const responseData = {
      pokemon: result.pokemon.map((p: Pokemon) => PokemonResponseDto.fromEntity(p)),
      totalCount: result.totalCount,
      offset: result.offset,
      limit: result.limit,
      hasMore: result.hasMore,
      nextOffset: result.nextOffset,
    };

    const requestId = (req.headers['x-request-id'] as string) || undefined;
    return ApiResponse.success(responseData, 'Pokemon list retrieved successfully', requestId).toJSON();
  }

  @Get('abilities')
  async getAvailableAbilities(@Req() req: Request) {
    const abilities = await this.pokemonService.getAvailableAbilities();
    const requestId = (req.headers['x-request-id'] as string) || undefined;
    return ApiResponse.success({ abilities }, 'Available abilities retrieved successfully', requestId).toJSON();
  }

  @Get(':id')
  async getPokemonById(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const pokemon = await this.pokemonService.getPokemonById(id);
    const requestId = (req.headers['x-request-id'] as string) || undefined;

    if (!pokemon) {
      return ApiResponse.error({
        code: 'POKEMON_NOT_FOUND',
        message: `Pokemon with ID ${id} not found`,
        details: { id },
      }, requestId).toJSON();
    }

    return ApiResponse.success(PokemonResponseDto.fromEntity(pokemon), 'Pokemon retrieved successfully', requestId).toJSON();
  }
}

