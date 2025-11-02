import { useHealth } from '../../services/hooks/useHealth';

export const HomePage = () => {
  const { data: health, isLoading, error } = useHealth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

  return (
    <div className="home-page">
      <h2>Welcome to Pokemon Data Analysis</h2>
      {health && (
        <div className="health-status">
          <p>Status: <strong>{health.status}</strong></p>
          <p>Version: {health.version}</p>
          <p>Uptime: {health.uptime}s</p>
        </div>
      )}
    </div>
  );
};

