import { SearchHeader } from './layouts/SearchHeader';
import { Home } from './pages/home';
import { initializeEventManager } from './utils';

export const App = () => {
  return ` ${SearchHeader()} ${Home()} `;
};

initializeEventManager();
