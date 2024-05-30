import './css/reset.css';
import './css/common.css';
import Layout from './components/Layout';
import { MovieListView } from './view/MovieView';

window.alert('helloworld!');
const app = document.getElementById('app');
app.appendChild(Layout());
addEventListener('DOMContentLoaded', MovieListView);
