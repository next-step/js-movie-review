import ApiClient from "./client";

const BASE_API_KEY = process.env.API_KEY;

export async function getPopularMovies(page) {
  const param = new URLSearchParams({
    api_key: BASE_API_KEY,
    language: "ko-KR",
    page,
  });

  const data = await ApiClient.get(`/movie/popular?${param}`);

  return data;
}

export async function searchMovies(query, page) {
  const param = new URLSearchParams({
    api_key: BASE_API_KEY,
    language: "ko-KR",
    page,
    query,
  });

  const data = await ApiClient.get(`/search/movie?${param}`);

  return data;
}
