const BASE_URL = "https://api.themoviedb.org/3/movie";
const BASE_API_KEY = process.env.API_KEY;

export async function getPopularMovies(page) {
  const param = new URLSearchParams({
    api_key: BASE_API_KEY,
    language: "ko-KR",
    page,
  });

  const response = await fetch(`${BASE_URL}/popular?${param}`);

  if (response.ok) {
    return response.json();
  }
  return { results: [] };
}
