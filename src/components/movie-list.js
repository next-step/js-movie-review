import { createMovieItem } from "./movie-item.js";

export const createMovieList = (itemList) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...itemList.map(createMovieItem));
  return fragment;
};
