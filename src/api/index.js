async function getMovieList({ page }) {
  try {
    // https://api.themoviedb.org/3/movie/popular?api_key=252a4eaee3a54b8671ca4de1dd773f8d&page=1&language=ko-KR&sort_by=popularity.desc
    const response = await fetch(
      `${process.env.TMDB_BASE_URL}?page=${page}&api_key=${process.env.TMDB_API_KEY}&language=ko-KR&sort_by=popularity.desc`
    );
    const jsonData = await response.json();

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error("서버 인증에러가 발생했습니다.");
        default:
          throw new Error(`${response.status} 통신에 문제가 있습니다.`);
      }
    }

    return jsonData;
  } catch (error) {
    throw new Error(`서버에서 에러가 발생했습니다.`);
  }
}

export { getMovieList };
