import {
  createMovieListSection,
  updateMovieList,
  hiddenMovieListLoadButton,
} from "src/features/movies/ui/movie-list";

import {
  fetchPopularMovies,
  MAX_PAGE,
} from "src/features/movies/api/fetchPopularMovies";

import { GetPopularMoviesResponse } from "src/features/movies/api/model";

const handleLoadMore = async (
  fetchNextPage: () => Promise<{ data: GetPopularMoviesResponse }>
) => {
  const { data } = await fetchNextPage();
  updateMovieList(data.results);

  if (data.page === MAX_PAGE) {
    hiddenMovieListLoadButton();
  }
};

export const popularMovies = async () => {
  const response = await fetchPopularMovies();

  // TypeScript와 JavaScript 간의 타입 호환성 문제를 해결하기 위해 타입 단언(as never[])을 사용
  // createMovieListSection은 JavaScript로 작성되어 있어 TypeScript 타입과 호환되지 않음
  const movieList = createMovieListSection({
    movies: response?.initialData?.results as never[],
    onLoadMore: () => handleLoadMore(response?.fetchNextPage),
    title: "지금 인기 있는 영화",
  });

  return movieList;
};
