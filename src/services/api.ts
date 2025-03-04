import { ApiMovie } from "../types/type";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const API_KEY: string = import.meta.env.VITE_API_KEY;

function fetchWithTimeout(
  url: string,
  options?: RequestInit,
  timeout: number = 5000
): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(
        () => reject(new Error("요청 시간이 초과되었습니다.")),
        timeout
      )
    ),
  ]);
}

export async function fetchMovies(
  category: string,
  page: number = 1
): Promise<ApiMovie[]> {
  const url: string = `${BASE_URL}/movie/${category}?language=ko-KR&page=${page}`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await fetchWithTimeout(url, options, 10000);
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
}

export async function fetchSearchMovies(
  query: string,
  page: number = 1
): Promise<ApiMovie[]> {
  const url: string = `${BASE_URL}/search/movie?language=ko-KR&page=${page}&query=${encodeURIComponent(
    query
  )}`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const response = await fetchWithTimeout(url, options, 10000);
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
}
