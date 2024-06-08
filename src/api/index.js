async function getMovieList({ page }) {
  try {
    // https://api.themoviedb.org/3/movie/popular?api_key=252a4eaee3a54b8671ca4de1dd773f8d&page=1&language=ko-KR&sort_by=popularity.desc
    const response = await fetch(
      `${process.env.TMDB_BASE_URL}?page=${page}&api_key=${process.env.TMDB_API_KEY}&language=ko-KR&sort_by=popularity.desc`
    );
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    throw new Error(error);
  }
}

export { getMovieList };
