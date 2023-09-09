import './css/index.css';
import App from './js/App';
import { $ } from './js/utils/selector';

window.onload = () => {
  new App($('#app'));
};
