const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
};

export async function getPopularMovies(page = 1) {
  try {
    const url = "https://api.themoviedb.org/3/movie/popular";
    const queries = new URLSearchParams({
      language: "ko-KR",
      page: page,
    }).toString();
    const response = await fetch(`${url}?${queries}`, { headers: headers });
    if (!response.ok) {
      throw new Error(
        `[${response.status}] API 호출을 실패하였습니다. 다시 시도해주세요.`
      );
    }
    return await response.json();
  } catch (error) {
    throw new Error(`getPopularMovies error : ${error.message}`);
  }
}
