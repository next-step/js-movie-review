export const fetchPopularMovies = async ({ page = 1 }) => {
  const baseUrl = "https://api.themoviedb.org/3/movie/popular";
  const param = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY,
    language: "ko-KR",
    page,
  });

  const response = await fetch(`${baseUrl}?${param}`);
  const data = await response.json();
  return data.results;
};
