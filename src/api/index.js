const TMDB_BASE_URL = "https://api.themoviedb.org/3/movie/popular";

async function getMovieList({ page }) {
  try {
    // https://api.themoviedb.org/3/movie/popular?api_key=252a4eaee3a54b8671ca4de1dd773f8d&page=1&language=ko-KR&sort_by=popularity.desc
    console.log("process.env.TMDB_API_KEY", process.env.TMDB_API_KEY);
    const response = await fetch(
      `${TMDB_BASE_URL}?api_key=${process.env.TMDB_API_KEY}&page=${page}&language=ko-KR&sort_by=popularity.desc`
    );
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    throw new Error("에러 발생");
  }
}

export { TMDB_BASE_URL, getMovieList };
