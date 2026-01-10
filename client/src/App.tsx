import { Suspense, lazy } from 'react';
import LoadingState from './components/LoadingState/LoadingState';

const CountriesPage = lazy(() => import('./components/CountriesPage/CountriesPage'));

function App() {
  return (
    <Suspense fallback={<LoadingState />}>
      <CountriesPage />
    </Suspense>
  );
}

export default App;

