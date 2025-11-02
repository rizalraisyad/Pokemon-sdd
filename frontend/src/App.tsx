import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/cache/queryClient';
import { PokemonListPage } from './pages/PokemonListPage/PokemonListPage';
import './App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonListPage />
    </QueryClientProvider>
  );
}

export default App;

