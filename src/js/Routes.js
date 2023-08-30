import Main from './pages/Main';
import { $ } from './utils/selector';
import Route from './core/Route';

/**
 * @type {Route[]}
 */
const Routes = [Route('/', () => new Main($('#app')))];

export default Routes;
