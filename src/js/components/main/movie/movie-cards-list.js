import { movieCard } from "./movie-card";

export const movieCardsList = {
  render() {
    const element = document.createElement("ul");
    element.classList.add("item-list");

    return element;
  },

  load(movies) {
    const itemList = document.querySelector(".item-list");

    const fragment = this.create(movies);

    itemList.appendChild(fragment);
  },

  create(movies) {
    const fragment = document.createDocumentFragment();

    movies.forEach((movie) => {
      const item = this.generate(movie);
      fragment.appendChild(item);
    });

    return fragment;
  },

  generate(movie) {
    const item = movieCard.generateMovieItem(movie);

    return item;
  },
};
