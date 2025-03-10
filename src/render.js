import { Headers } from './components/Headers';
import { LoadMoreButton } from './components/LoadMoreButton';
import { MovieItem } from './components/MovieItem';
import { MovieList } from './components/MovieList';
import { DEFAULT_MOVIE_RENDER_COUNT } from './constants';

export const renderHeaders = (movie) => {
  const wrap = document.querySelector("#wrap");
  wrap.insertAdjacentHTML("afterbegin", Headers(movie));
};

export const renderMovieSection = (movies) => {
  const movieSection = document.querySelector(".movie-section");
  movieSection.innerHTML = MovieList({ movies });

  const initHasMoreMovies = movies.length === DEFAULT_MOVIE_RENDER_COUNT;
  const loadMoreButtonHTML = LoadMoreButton(initHasMoreMovies);
  movieSection.insertAdjacentHTML("beforeend", loadMoreButtonHTML);
};

export const renderMovieItems = (movies) => {
    return movies.map((movie) => MovieItem(movie)).join("");
  };

export const appendMovieItems = (movies) => {
    const movieSection = document.querySelector(".thumbnail-list");
    movieSection.insertAdjacentHTML("beforeend", renderMovieItems(movies));
  };