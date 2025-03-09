export const createMovieListItem = (movie) => {
  const movieListItem = document.createElement("li");
  movieListItem.classList.add("item");

  movieListItem.innerHTML = /*html*/ `
    <img
    class="thumbnail"
    src="${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${movie.poster_path}"
    alt="${movie.title}"
    />
    <div class="item-desc">
      <p class="rate">
        <img src="./images/star_empty.png" class="star" />
        <span>${movie.vote_average.toFixed(1)}</span>
      </p>
      <strong class="item-title">${movie.title}</strong>
    </div>
  `;

  return movieListItem;
};

export const createMovieList = (movies) => {
  const movieList = document.createElement("ul");
  movieList.classList.add("thumbnail-list");

  movies.forEach((movie) => {
    movieList.appendChild(createMovieListItem(movie));
  });

  return movieList;
};

export const createMovieListLoadButton = (onClick) => {
  const button = document.createElement("button");
  button.classList.add("load-button");
  button.textContent = "더보기";

  button.addEventListener("click", onClick);

  return button;
};

export const hiddenMovieListLoadButton = () => {
  const loadButton = document.querySelector(".load-button");
  if (loadButton) loadButton.style.display = "none";
};

export const createMovieLayout = () => {
  const layoutContainer = document.createElement("main");
  const layoutSection = document.createElement("section");

  const layoutTitle = document.createElement("h2");
  layoutTitle.textContent = "지금 인기 있는 영화";

  layoutSection.appendChild(layoutTitle);
  layoutContainer.appendChild(layoutSection);

  return layoutContainer;
};

export const createMovieContainer = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  return container;
};
