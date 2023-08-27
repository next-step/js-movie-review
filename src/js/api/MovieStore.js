import APIStore from './core/APIStore.js';
import { getMovies } from './movies.js';

class MovieStore extends APIStore {
  static KEY = 'movies';

  constructor() {
    super([], MovieStore.KEY);
  }
}

const movieStore = new MovieStore();

export default movieStore;
