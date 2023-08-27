import APIStore from './core/APIStore.js';

class MovieStore extends APIStore {
  static KEY = 'movies';

  constructor() {
    super([], MovieStore.KEY);
  }
}

const movieStore = new MovieStore();

export default movieStore;
