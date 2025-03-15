import {
  createMovieListItem,
  createMovieList,
  createMovieListLoadButton,
  createMovieLayout,
  createMovieContainer,
  createEmptyMovieList,
  hiddenMovieListLoadButton,
} from "./ui.js";
import {
  createSkeletonMovieList,
  hiddenSkeletonMovieListItem,
} from "./skeleton-ui.js";
import { createFallbackView, hiddenFallbackView } from "./fallback-ui.js";

export { hiddenMovieListLoadButton };

export const updateMovieList = (movies) => {
  const movieList = document.querySelector(".thumbnail-list");

  movies.forEach((movie) => {
    movieList.appendChild(createMovieListItem(movie));
  });
};

const onClickLoadButton = async (onLoadMore) => {
  const movieList = document.querySelector(".thumbnail-list");
  hiddenFallbackView();

  try {
    const skeletonMovieListItem = createSkeletonMovieList();
    movieList.append(...skeletonMovieListItem);
    await onLoadMore();
  } catch (error) {
    const fallback = createFallbackView();
    movieList.parentNode.insertBefore(fallback, movieList.nextSibling);
  } finally {
    hiddenSkeletonMovieListItem();
  }
};

export const createMovieListSection = ({
  movies = [],
  showLoadButton = true,
  onLoadMore,
  title = "",
  showEmptyMovieList = false,
  emptyMovieListMessage = "검색 결과가 없습니다 🥲",
}) => {
  const container = createMovieContainer();
  const layout = createMovieLayout(title);

  const movieList = createMovieList(movies);
  const emptyMovieList = createEmptyMovieList(emptyMovieListMessage);

  const loadButton = showLoadButton
    ? createMovieListLoadButton(() => onClickLoadButton(onLoadMore))
    : null;

  container.appendChild(layout);
  layout.appendChild(showEmptyMovieList ? emptyMovieList : movieList);
  if (loadButton) layout.appendChild(loadButton);

  return container;
};
