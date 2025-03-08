export const getFavoriteMovies = async (index = 1) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${index}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.MOVIE_TMDB_KEY}`,
    },
  });
  const { results } = await response.json();

  return results;
};

export const getTopRatedMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.MOVIE_TMDB_KEY}`,
    },
  });
  const { results } = await response.json();

  return results;
};

export const getSearchMovie = async (query = "") => {
  const url = `https://api.themoviedb.org/3/search/movie?language=ko-KR&page=1&query=${query}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.MOVIE_TMDB_KEY}`,
    },
  });
  const { results } = await response.json();
  return results;
};
