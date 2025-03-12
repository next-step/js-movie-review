import {
  createMovieListSection,
  updateMovieList,
  hiddenMovieListLoadButton,
} from "src/features/movies/ui/movie-list";

import { fetchSearchMovies } from "src/features/movies/api/fetchSearchMovies";

const handleLoadMore = async (fetchNextPage) => {
  const { data } = await fetchNextPage();
  updateMovieList(data.results);

  if (page === totalPages) {
    hiddenMovieListLoadButton();
  }
};

export const searchResults = async ({ query }) => {
  const response = await fetchSearchMovies({ query });

  const movieList = createMovieListSection({
    movies: response?.initialData?.results,
    showLoadButton:
      response?.initialData?.page !== response?.initialData?.total_pages,
    onLoadMore: () => handleLoadMore(response?.fetchNextPage),
  });

  return movieList;
};
