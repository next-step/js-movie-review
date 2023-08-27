/* TMDB */
const TMDB_CONFIG = Object.freeze({
  GET_MOVIE: {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.MOVIE_API_KEY}`,
      accept: 'application/json',
    },
  },
});

const TMDB = Object.freeze({
  POPULAR_MOVIE: {
    endpoint:
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    config: TMDB_CONFIG.GET_MOVIE,
  },
});

/* Export */
export const MOVIE_API = Object.freeze({
  TMDB,
});

export const PROMISE_STATE = Object.freeze({
  FULFILLED: 'fulfilled',
});
