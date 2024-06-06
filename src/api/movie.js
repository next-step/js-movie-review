import ApiClient from "./client";

const BASE_API_KEY = process.env.API_KEY;

export async function getPopularMovies(page) {
  const param = new URLSearchParams({
    api_key: BASE_API_KEY,
    language: "ko-KR",
    page,
  });

  const data = await ApiClient.get(`/popular?${param}`);

  return data;
}
