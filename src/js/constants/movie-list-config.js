import { getPopularMovies } from '../api/movies';

const MOVIE_LIST = Object.freeze({
  POPULAR: {
    KEY: 'popularMovies',
    TITLE: '지금 있기있는 영화',
    FETCH: getPopularMovies,
  },
});

export default MOVIE_LIST;
