import { MainFooter } from './layouts/MainFooter';
import { ThumbnailHeader } from './layouts/ThumbnailHeader';
import { Home } from './pages/home';
import { initializeEventManager } from './utils';

export const App = () => {
  initializeEventManager();

  return `
    <div id="wrap">
      ${ThumbnailHeader()}
      <div class="container">${Home()}</div>
      ${MainFooter()}
    </div>
  `;
};
