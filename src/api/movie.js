const DEFAULT_SEARCH_PARAMS = {
  api_key: process.env.API_KEY,
  language: 'ko-KR',
};
const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/movie';

async function getPopular(page) {
  const param = new URLSearchParams({
    ...DEFAULT_SEARCH_PARAMS,
    page,
  });
  return await fetch(`${MOVIE_BASE_URL}/popular?${param}`).then((res) =>
    res.json()
  );
}

const Movie = {
  getPopular,
};

export default Movie;
