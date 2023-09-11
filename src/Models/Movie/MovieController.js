import { MovieService } from './MovieService';
import { MOVIE_API } from '../../constants';

const movieApis = [MOVIE_API.TMDB.POPULAR_MOVIE];

export class MovieController {
  #service = new MovieService(movieApis);

  getAllMovies() {
    return this.#service.fetchAllMovies();
  }
}
