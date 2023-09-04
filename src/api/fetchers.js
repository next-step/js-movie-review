import { HTTP_METHOD, FETCH_OPTIONS_HEADERS } from '../constants/api.js';
import { API_TMDB_BASE_URL } from '../constants/env.js';

export const getPopularMovieLists = (page = 1) => {
  const options = {
    method: HTTP_METHOD.GET,
    headers: { ...FETCH_OPTIONS_HEADERS },
  };

  return fetch(`${API_TMDB_BASE_URL}/movie/popular?page=${page}`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const getSearchMovieLists = (query, page = 1) => {
  const options = {
    method: HTTP_METHOD.GET,
    headers: { ...FETCH_OPTIONS_HEADERS },
  };

  return fetch(
    `${API_TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}&page=${page}`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const getMovieDetails = (movieId) => {
  const options = {
    method: HTTP_METHOD.GET,
    headers: { ...FETCH_OPTIONS_HEADERS },
  };

  return fetch(`${API_TMDB_BASE_URL}/movie/${movieId}`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
