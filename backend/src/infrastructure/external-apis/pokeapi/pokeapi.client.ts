import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

@Injectable()
export class PokeApiClient {
  private readonly logger = new Logger(PokeApiClient.name);
  private readonly client: AxiosInstance;
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        this.logger.debug(`PokeAPI Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error: AxiosError) => {
        this.logger.error(`PokeAPI Request Error: ${error.message}`);
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      (response: any) => {
        this.logger.debug(`PokeAPI Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          this.logger.warn(
            `PokeAPI Error: ${error.response.status} ${error.response.statusText} - ${error.config?.url}`,
          );
        } else if (error.request) {
          this.logger.error(`PokeAPI Network Error: ${error.message}`);
        } else {
          this.logger.error(`PokeAPI Error: ${error.message}`);
        }
        return Promise.reject(error);
      },
    );
  }

  async getPokemonList(offset = 0, limit = 20): Promise<{
    count: number;
    results: Array<{ name: string; url: string }>;
  }> {
    try {
      const response = await this.client.get('/pokemon', {
        params: { offset, limit },
      });
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch Pokemon list: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async getPokemonById(id: number): Promise<any> {
    try {
      const response = await this.client.get(`/pokemon/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        this.logger.warn(`Pokemon with ID ${id} not found`);
        return null;
      }
      this.logger.error(`Failed to fetch Pokemon ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  async getPokemonByName(name: string): Promise<any> {
    try {
      const response = await this.client.get(`/pokemon/${name.toLowerCase()}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        this.logger.warn(`Pokemon with name ${name} not found`);
        return null;
      }
      this.logger.error(`Failed to fetch Pokemon ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }
}

