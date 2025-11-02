import axios, { AxiosInstance } from 'axios';
import {
  PokemonListResponse,
  PokemonQueryParams,
  Pokemon,
  ErrorResponse,
} from '../../shared/types/pokemon.types';

export class PokemonApiService {
  private readonly client: AxiosInstance;

  constructor(baseURL: string = 'http://localhost:3000/api/v1') {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const errorResponse: ErrorResponse = error.response.data;
          return Promise.reject(new Error(errorResponse.error.message));
        }
        return Promise.reject(error);
      },
    );
  }

  async getPokemonList(params?: PokemonQueryParams): Promise<PokemonListResponse> {
    const response = await this.client.get<PokemonListResponse>('/pokemon', {
      params,
    });
    return response.data;
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    const response = await this.client.get<{ success: boolean; data: Pokemon }>(
      `/pokemon/${id}`,
    );
    return response.data.data;
  }

  async getAvailableAbilities(): Promise<{ success: boolean; data: { abilities: string[] } }> {
    const response = await this.client.get<{ success: boolean; data: { abilities: string[] } }>(
      '/pokemon/abilities',
    );
    return response.data;
  }
}

export const pokemonApiService = new PokemonApiService();

