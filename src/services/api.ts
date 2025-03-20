import { MovieApiDto } from "../types/type";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const API_KEY: string = import.meta.env.VITE_API_KEY;

const fetchWithTimeout = (
  url: string,
  options?: RequestInit,
  timeout: number = 5_000
): Promise<Response> =>
  Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(
        () => reject(new Error("요청 시간이 초과되었습니다.")),
        timeout
      )
    ),
  ]);

type FetchDataOptions = {
  endpoint: string;
  params?: Record<string, string | number | undefined>;
  timeout?: number;
  init?: RequestInit;
};

const fetchData = async <T>({
  endpoint,
  params = {},
  timeout = 10_000,
  init,
}: FetchDataOptions): Promise<T> => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const options = { ...defaultOptions, ...init };

  const response = await fetchWithTimeout(url.toString(), options, timeout);

  if (!response.ok) {
    let errorMessage = `HTTP 요청 중 에러가 발생했습니다: ${response.status}`;

    if (response.status === 404) {
      errorMessage = "리소스를 찾을 수 없습니다. (404)";
    } else if (response.status >= 500) {
      errorMessage =
        "서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요. (5xx)";
    }

    throw new Error(errorMessage);
  }

  return response.json();
};

export const fetchMovies = async (category: string, page: number = 1) => {
  const data = await fetchData<{ results: MovieApiDto[] }>({
    endpoint: `movie/${category}`,
    params: { language: "ko-KR", page },
  });
  return data.results;
};

export const fetchSearchMovies = async (query: string, page: number = 1) => {
  const data = await fetchData<{ results: MovieApiDto[] }>({
    endpoint: "search/movie",
    params: { language: "ko-KR", page, query: encodeURIComponent(query) },
  });
  return data.results;
};

export const fetchMovieDetails = async (movieId: number) =>
  fetchData<MovieApiDto>({
    endpoint: `movie/${movieId}`,
    params: { language: "ko-KR" },
  });
