import { useQuery } from '@tanstack/react-query';
import { healthApi, HealthCheckResponse } from '../api/health.api';

export const useHealth = (includeServices = false) => {
  return useQuery<HealthCheckResponse>({
    queryKey: ['health', includeServices],
    queryFn: () => healthApi.checkHealth(includeServices),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
};

