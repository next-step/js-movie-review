const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function fetchWithTimeout(url, options, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("요청 시간이 초과되었습니다.")),
        timeout
      )
    ),
  ]);
}

export async function fetchMovies(page = 1) {
  const url = `${BASE_URL}/popular?language=ko-KR&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await fetchWithTimeout(url, options, 10000);
    if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
}
