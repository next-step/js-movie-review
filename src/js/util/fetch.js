// import dotenv from "dotenv";
// dotenv.config();

export const fetchPopularMovies = async () => {
  const baseUrl = "https://api.themoviedb.org/3/movie/popular";
  const param = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY,
    language: "ko-KR",
  });

  const response = await fetch(`${baseUrl}?${param}`);
  const data = await response.json();
  return data.results;
};
