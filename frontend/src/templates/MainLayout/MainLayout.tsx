import { HomePage } from '../../pages/HomePage/HomePage';

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <header>
        <h1>Pokemon Data Analysis</h1>
      </header>
      <main>
        <HomePage />
      </main>
    </div>
  );
};

