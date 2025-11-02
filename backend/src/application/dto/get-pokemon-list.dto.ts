import { IsOptional, IsInt, Min, Max, IsString, MaxLength, IsArray, IsIn } from 'class-validator';

export class GetPokemonListDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  abilities?: string[];

  @IsOptional()
  @IsIn(['ability', 'name', 'id'])
  sortBy?: 'ability' | 'name' | 'id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortDirection?: 'asc' | 'desc';
}

