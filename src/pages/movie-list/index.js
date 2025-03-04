import {
  createMovieListItem,
  createMovieList,
  createMovieListLoadButton,
  createMovieLayout,
  createMovieContainer,
  hiddenMovieListLoadButton,
} from "./ui.js";
import {
  createSkeletonMovieList,
  hiddenSkeletonMovieListItem,
} from "./skeleton-ui.js";
import { createFallbackView } from "./fallback-ui.js";

export { hiddenMovieListLoadButton };

export const updateMovieList = (movies) => {
  const movieList = document.querySelector(".thumbnail-list");

  movies.forEach((movie) => {
    movieList.appendChild(createMovieListItem(movie));
  });
};

const onClickLoadButton = async (onLoadMore) => {
  const movieList = document.querySelector(".thumbnail-list");

  try {
    const skeletonMovieListItem = createSkeletonMovieList();
    movieList.append(...skeletonMovieListItem);

    await onLoadMore();
  } catch (error) {
    const fallback = createFallbackView({
      onRetry: () => onClickLoadButton(onLoadMore),
    });
    movieList.parentNode.insertBefore(fallback, movieList.nextSibling);
  } finally {
    hiddenSkeletonMovieListItem();
  }
};

export const createMovieListSection = ({ movies = [], onLoadMore }) => {
  const container = createMovieContainer();
  const layout = createMovieLayout();
  const movieList = createMovieList(movies);

  const loadButton = createMovieListLoadButton(() =>
    onClickLoadButton(onLoadMore)
  );

  container.appendChild(layout);
  layout.appendChild(movieList);
  layout.appendChild(loadButton);

  return container;
};
