export const getFavoriteMovies = async (index = 1) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${index}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TMDB_KEY}`,
    },
  });
  const data = await response.json();

  return data;
};

export const getTopRatedMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TMDB_KEY}`,
    },
  });
  const data = await response.json();

  return data;
};
