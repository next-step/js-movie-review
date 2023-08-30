import './css/index.css';
import App from './js/App.js';
import { $ } from './js/utils/selector';

window.onload = () => {
  new App($('#app'));
};
