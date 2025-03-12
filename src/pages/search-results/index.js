import {
  createMovieListSection,
  updateMovieList,
  hiddenMovieListLoadButton,
} from "src/features/movies/ui/movie-list";

import { fetchSearchMovies } from "src/features/search/api/fetchSearchMovies";

import { searchParamsManager } from "src/features/search/models/params";

const handleLoadMore = async (fetchNextPage) => {
  const { data } = await fetchNextPage();
  updateMovieList(data.results);

  if (page === totalPages) {
    hiddenMovieListLoadButton();
  }
};

export const searchResults = async () => {
  const query = searchParamsManager.getKeyword();

  const response = await fetchSearchMovies({ query });

  const movieList = createMovieListSection({
    movies: response?.initialData?.results,
    showLoadButton:
      response?.initialData?.page !== response?.initialData?.total_pages,
    onLoadMore: () => handleLoadMore(response?.fetchNextPage),
    title: `"${query}" 검색 결과`,
    showEmptyMovieList: response && response?.initialData?.results.length === 0,
  });

  return movieList;
};
