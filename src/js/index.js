import '../styles/reset.css';
import '../styles/common.css';

import { Layout } from '../components/Layout';
import { MovieListView } from '../view/movieListView';

const app = document.getElementById('app');
app.appendChild(Layout());
app.addEventListener('DOMContentLoaded', MovieListView());
