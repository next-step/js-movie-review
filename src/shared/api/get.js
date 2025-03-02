export const getFavoriteMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.MOVIE_TMDB_KEY}`,
    },
  });

  return response;
};
