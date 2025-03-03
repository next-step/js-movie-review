import { createHeader } from "src/shared/ui/header";
import { createFooter } from "src/shared/ui/footer";
import {
  createMovieListSection,
  updateMovieList,
  hiddenMovieListLoadButton,
} from "src/pages/movie-list";

import { fetchApiWithPagination } from "src/shared/apis/api";

// API 에러 메시지: "Invalid page: Pages start at 1 and max at 500. They are expected to be an integer."
const MAX_PAGE = 500;

const fetchPopularMovies = async () => {
  return await fetchApiWithPagination("/movie/popular?language=ko-KO", {
    getItems: (response) => response.results,
  });
};

const handleLoadMore = async (fetchNextPage) => {
  const { totalItems, data } = await fetchNextPage();
  updateMovieList(totalItems);

  if (data.page === MAX_PAGE) {
    hiddenMovieListLoadButton();
  }
};

addEventListener("load", async () => {
  const app = document.querySelector("#app");

  const { initialData, fetchNextPage } = await fetchPopularMovies();

  const header = createHeader();
  const footer = createFooter();

  const movieList = createMovieListSection({
    movies: initialData.results,
    onLoadMore: () => handleLoadMore(fetchNextPage),
  });

  app.append(header, movieList, footer);
});
