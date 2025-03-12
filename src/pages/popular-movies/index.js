import {
  createMovieListSection,
  updateMovieList,
  hiddenMovieListLoadButton,
} from "src/features/movies/ui/movie-list";

import {
  fetchPopularMovies,
  MAX_PAGE,
} from "src/features/movies/api/fetchPopularMovies";

const handleLoadMore = async (fetchNextPage) => {
  const { data } = await fetchNextPage();
  updateMovieList(data.results);

  if (data.page === MAX_PAGE) {
    hiddenMovieListLoadButton();
  }
};

export const popularMovies = async () => {
  const response = await fetchPopularMovies();

  const movieList = createMovieListSection({
    movies: response?.initialData?.results,
    onLoadMore: () => handleLoadMore(response?.fetchNextPage),
  });

  return movieList;
};
