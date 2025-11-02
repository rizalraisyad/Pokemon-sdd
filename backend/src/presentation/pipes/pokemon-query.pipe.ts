import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PokemonQueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query') {
      return value;
    }

    const sanitized: any = {};

    if (value.offset !== undefined) {
      const offset = parseInt(value.offset, 10);
      if (isNaN(offset) || offset < 0) {
        throw new BadRequestException('Offset must be a non-negative integer');
      }
      sanitized.offset = offset;
    } else {
      sanitized.offset = 0;
    }

    if (value.limit !== undefined) {
      const limit = parseInt(value.limit, 10);
      if (isNaN(limit) || limit < 1 || limit > 100) {
        throw new BadRequestException('Limit must be between 1 and 100');
      }
      sanitized.limit = limit;
    } else {
      sanitized.limit = 20;
    }

    if (value.search !== undefined) {
      if (typeof value.search !== 'string') {
        throw new BadRequestException('Search must be a string');
      }
      sanitized.search = value.search.trim().substring(0, 100);
      if (sanitized.search.length === 0) {
        delete sanitized.search;
      }
    }

    if (value.abilities !== undefined) {
      const abilities = Array.isArray(value.abilities)
        ? value.abilities
        : value.abilities.split(',').map((a: string) => a.trim());
      sanitized.abilities = abilities
        .map((a: string) => a.trim())
        .filter((a: string) => a.length > 0)
        .slice(0, 10); // Limit to 10 abilities max
    }

    if (value.sortBy !== undefined) {
      const validSortBy = ['ability', 'name', 'id'];
      if (!validSortBy.includes(value.sortBy)) {
        throw new BadRequestException(
          `SortBy must be one of: ${validSortBy.join(', ')}`,
        );
      }
      sanitized.sortBy = value.sortBy;
    }

    if (value.sortDirection !== undefined) {
      const validDirections = ['asc', 'desc'];
      if (!validDirections.includes(value.sortDirection)) {
        throw new BadRequestException(
          `SortDirection must be one of: ${validDirections.join(', ')}`,
        );
      }
      sanitized.sortDirection = value.sortDirection;
    }

    return sanitized;
  }
}

