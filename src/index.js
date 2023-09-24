import { MovieList } from './components/MovieList.js';
import { TMDBClient } from './domain/TMDBClient.js';

function App() {
  const $movieItemsWrapper = document.querySelector('.item-list');
  const movieClient = new TMDBClient(process.env.API_URL);
  const movieList = new MovieList(movieClient, $movieItemsWrapper);

  movieList.render();
}

App();
