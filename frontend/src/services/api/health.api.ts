export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  services?: Record<string, 'healthy' | 'unhealthy' | 'degraded'>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const healthApi = {
  async checkHealth(includeServices = false): Promise<HealthCheckResponse> {
    const url = `${API_URL}/health${includeServices ? '?includeServices=true' : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    
    return response.json();
  },
};

