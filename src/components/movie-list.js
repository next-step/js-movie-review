import { createMovieItem } from "./movie-item.js";

export const createMovieList = (itemList) => {
  const fragment = document.createDocumentFragment();
  itemList.forEach((item) => {
    fragment.append(createMovieItem(item));
  });

  return fragment;
};
