import Routes from './Routes';
import NotFound from './pages/NotFound';
import { $ } from './utils/selector';

const Router = async () => {
  const pageMatches = Routes.map((route) => ({
    route,
    isMatch: window.location.pathname === route.path,
  }));

  const match = pageMatches.find((pageMatch) => pageMatch.isMatch);

  if (!match) {
    return new NotFound($('#app'));
  }

  match.route.view();
};

const navigate = (url) => {
  window.history.pushState(null, null, `/js-movie-review${url}`);
  Router();
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (!(target instanceof HTMLAnchorElement)) return;

    e.preventDefault();
    navigate(target.href);
  });

  Router();
});

window.addEventListener('popstate', Router);

export default Router;
