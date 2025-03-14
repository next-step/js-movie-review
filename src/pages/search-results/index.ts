import {
  createMovieListSection,
  updateMovieList,
  hiddenMovieListLoadButton,
} from "src/features/movies/ui/movie-list";

import { searchParamsManager } from "src/features/search/models/params";

import { fetchSearchMovies } from "src/features/search/api/fetchSearchMovies";
import { GetSearchMoviesResponse } from "src/features/search/api/model";

const handleLoadMore = async (
  fetchNextPage: () => Promise<{ data: GetSearchMoviesResponse }>
) => {
  const { data } = await fetchNextPage();
  updateMovieList(data.results);

  if (data.page === data.total_pages) {
    hiddenMovieListLoadButton();
  }
};

export const searchResults = async () => {
  const query = searchParamsManager.getKeyword() ?? "";

  const response = await fetchSearchMovies({ query });

  // TypeScript와 JavaScript 간의 타입 호환성 문제를 해결하기 위해 타입 단언(as never[])을 사용
  // createMovieListSection은 JavaScript로 작성되어 있어 TypeScript 타입과 호환되지 않음
  const movieList = createMovieListSection({
    movies: response?.initialData?.results as never[],
    showLoadButton:
      response?.initialData?.page !== response?.initialData?.total_pages,
    onLoadMore: () => handleLoadMore(response?.fetchNextPage),
    title: `"${query}" 검색 결과`,
    showEmptyMovieList: response && response?.initialData?.results.length === 0,
  });

  return movieList;
};
