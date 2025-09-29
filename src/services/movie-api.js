import ApiClient from "./api-client.js";

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
};

export async function getPopularMovies(page = 1) {
  const endPoint = "movie/popular";
  const queries = new URLSearchParams({
    language: "ko-KR",
    page: page,
  }).toString();
  return await ApiClient.get(`${endPoint}?${queries}`, headers);
}
