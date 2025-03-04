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
  try {
    return await fetchApiWithPagination("/movie/popular?language=ko-KO", {
      getItems: (response) => response.results,
    });
  } catch (error) {
    return null;
  }
};

const handleLoadMore = async (fetchNextPage) => {
  const { data } = await fetchNextPage();
  updateMovieList(data.results);

  if (data.page === MAX_PAGE) {
    hiddenMovieListLoadButton();
  }
};

addEventListener("load", async () => {
  const app = document.querySelector("#app");

  const header = createHeader();
  const footer = createFooter();

  const response = await fetchPopularMovies();

  const movieList = createMovieListSection({
    movies: response?.initialData?.results,
    onLoadMore: () => handleLoadMore(response?.fetchNextPage),
  });

  app.append(header, movieList, footer);
});
