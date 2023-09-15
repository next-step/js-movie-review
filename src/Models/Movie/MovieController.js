import { MovieService } from './MovieService';
import { EVENT, MOVIE_API } from '../../constants';
import { Fetcher } from '../Fetcher';
import { MovieComponent } from '../../components';

export class MovieController {
  #service;
  #fetcher;

  constructor() {
    this.#fetcher = new Fetcher();
    this.#service = new MovieService(this.#fetcher);
    this.#setupLoadingEvent();
  }

  #setupLoadingEvent() {
    this.#fetcher.eventListener.addEventListener(
      EVENT.LOADING_STATE_CHANGE,
      () => {
        this.#loadingHandler(this.#fetcher.isLoading);
      }
    );
  }

  loadMovies() {
    const movieApis = [MOVIE_API.TMDB.POPULAR_MOVIE];

    return this.#service.fetchMovies(movieApis);
  }

  #loadingHandler(isLoading) {
    if (isLoading) return this.#renderSkeleton();
    this.#renderMovieComponent();
  }

  #renderSkeleton() {
    const targetElement = document.querySelector('#app');

    targetElement.innerHTML('SkeletonUI');
  }

  #renderMovieComponent(movie) {
    const movieList = document.querySelector('.movie-list');

    const { data } = movie;
    const movieComponents = data.map(
      (movieData) => new MovieComponent(movieData)
    );
    console.log(movieComponents);
  }
}
