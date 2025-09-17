export async function getPopularMovies(params) {
  const { language = "ko-KR", page = 1 } = params;

  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  url.searchParams.set("language", language);
  url.searchParams.set("page", page);

  const response = await fetch(url.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "일시적으로 에러가 발생했어요.");
  }

  const popularMovies = await response.json();

  return {
    ...popularMovies,
    results: popularMovies.results.map(toClientEntity),
  };
}

function toClientEntity(popularMovies) {
  const {
    adult,
    backdrop_path,
    genre_ids,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
  } = popularMovies;

  return {
    adult,
    backdropPath: backdrop_path,
    genreIds: genre_ids,
    id,
    originalLanguage: original_language,
    originalTitle: original_title,
    overview,
    popularity,
    posterPath: poster_path,
    releaseDate: release_date,
    title,
    video,
    voteAverage: vote_average,
    voteCount: vote_count,
  };
}
