import { apiClient } from "./apiClient";
import { BASE_URL } from "./constants";

export const fetchPopularMovies = async ({ page = 1 }) => {
  const param = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY,
    language: "ko-KR",
    page,
  });

  const response = await apiClient.get(`${BASE_URL}?${param}`);

  return response.results;
};
