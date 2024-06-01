const DEFAULT_SEARCH_PARAMS = {
  api_key: process.env.API_KEY,
  language: 'ko-KR',
};
const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/movie';

export async function getPopularMovie(page) {
  const param = new URLSearchParams({
    ...DEFAULT_SEARCH_PARAMS,
    page,
  });

  const response = await fetch(`${MOVIE_BASE_URL}/popular?${param}`);
  if (response.ok) {
    return response.json();
  }
  return { results: [] };
}
