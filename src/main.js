import { createHeader, addTopBar } from "src/shared/ui/header";
import { createSearchBar } from "src/shared/ui/search-bar";
import { createFooter } from "src/shared/ui/footer";
import {
  createMovieListSection,
  updateMovieList,
  hiddenMovieListLoadButton,
} from "src/features/movie-list";

import { fetchApiWithPagination } from "src/shared/apis/api";

// API 제한사항: 페이지는 1부터 시작하며 최대 500까지만 가능합니다.
// 500을 초과하는 페이지 요청 시 API 에러 발생: "Invalid page: Pages start at 1 and max at 500. They are expected to be an integer."
const MAX_PAGE = 500;

const fetchPopularMovies = async () => {
  try {
    return await fetchApiWithPagination("/movie/popular?language=ko-KO", {});
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
