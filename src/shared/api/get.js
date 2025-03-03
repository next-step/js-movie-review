export const getFavoriteMovies = async (index = 1) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${index}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.MOVIE_TMDB_KEY}`,
    },
  });
  const data = await response.json();

  return data;
};
