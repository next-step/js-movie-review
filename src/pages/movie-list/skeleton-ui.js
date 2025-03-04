const createSkeletonMovieListItem = () => {
  const movieListItem = document.createElement("li");
  movieListItem.classList.add("item", "skeleton");

  movieListItem.innerHTML = /*html*/ `
    <div class="thumbnail"></div>
    <div>
      <div class="rate"></div>
      <div class="title"></div>
    </div>
  `;

  return movieListItem;
};

export const createSkeletonMovieList = (length = 20) => {
  return Array.from({ length }, () => createSkeletonMovieListItem());
};

export const hiddenSkeletonMovieListItem = () => {
  const movieListItem = document.querySelectorAll(".skeleton");
  if (movieListItem) movieListItem.forEach((item) => item.remove());
};
