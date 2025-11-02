import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/cache/queryClient';
import { MainLayout } from './templates/MainLayout/MainLayout';
import './App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout />
    </QueryClientProvider>
  );
}

export default App;

