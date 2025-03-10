import { createHeader, addTopBar } from "src/shared/ui/header";
import { createSearchBar } from "src/shared/ui/search-bar";
import { createFooter } from "src/shared/ui/footer";
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

addEventListener("load", async () => {
  const app = document.querySelector("#app");

  const header = createHeader({ title: "인사이드 아웃2", rate: 9.5 });
  const searchBar = createSearchBar();
  addTopBar(header, searchBar);
  const footer = createFooter();

  const response = await fetchPopularMovies();

  const movieList = createMovieListSection({
    movies: response?.initialData?.results,
    onLoadMore: () => handleLoadMore(response?.fetchNextPage),
  });

  app.append(header, movieList, footer);
});
