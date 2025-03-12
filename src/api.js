const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const MAX_RETRIES = 3;

export const fetchPopularMovies = async (page = 1, retries = 0) => {
  try {
    const url = `${BASE_URL}/movie/popular?language=ko-KR&page=${page}`;
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    };

    const response = await fetch(url, { headers });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        `HTTP Status ${result.status_code} : ${result.status_message}`,
      );
    }

    return result;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      return fetchPopularMovies(page, retries + 1);
    }
    throw Error(`최대 재시도 횟수를 초과했습니다. ${error.message}`);
  }
};
