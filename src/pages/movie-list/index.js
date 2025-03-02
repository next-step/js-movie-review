const createMovieListItem = (movie) => {
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
        <span>${movie.vote_average}</span>
      </p>
      <strong class="item-title">${movie.title}</strong>
    </div>
  `;

  return movieListItem;
};

const createMovieList = (movies) => {
  const movieList = document.createElement("ul");
  movieList.classList.add("thumbnail-list");

  movies.forEach((movie) => {
    movieList.appendChild(createMovieListItem(movie));
  });

  return movieList;
};

const createMovieLayout = () => {
  const layoutContainer = document.createElement("main");
  const layoutSection = document.createElement("section");

  const layoutTitle = document.createElement("h2");
  layoutTitle.textContent = "지금 인기 있는 영화";

  layoutSection.appendChild(layoutTitle);
  layoutContainer.appendChild(layoutSection);

  return layoutContainer;
};

const createMovieContainer = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  return container;
};

export const createMovieListSection = (movies) => {
  const container = createMovieContainer();
  const layout = createMovieLayout();
  const movieList = createMovieList(movies);

  container.appendChild(layout);
  layout.appendChild(movieList);

  return container;
};
