import { starImage } from "../Image";

export function initMovieRender(movieListInstance, title) {
  const movieSection = document.querySelector(".movie-list");
  movieSection.innerHTML = "";
  movieSection.appendChild(createTitle(title));

  const fragment = document.createDocumentFragment();
  const movieUl = document.createElement("ul");
  movieUl.classList.add("thumbnail-list");

  movieListRender(movieUl, movieListInstance);

  fragment.appendChild(movieUl);
  movieSection.appendChild(fragment);
}

export function addMovieRender(movieListInstance) {
  const movieUl = document.querySelector(".thumbnail-list");
  movieListRender(movieUl, movieListInstance);
}

function movieListRender(movieUl, movieListInstance) {
  const fragment = document.createDocumentFragment();
  movieListInstance.movieModels.forEach((movieInstance) => {
    const movieElement = createMovie(movieInstance);
    fragment.appendChild(movieElement);
  });

  movieUl.appendChild(fragment);
}

function createTitle(title) {
  const item = document.createElement("h2");
  item.innerHTML = /*html*/ `
        ${title}
    `;
  return item;
}

function createMovie(movieInstance) {
  const item = document.createElement("li");

  const starImagePath =
    movieInstance.vote_average === "0.0"
      ? starImage["empty"]
      : starImage["filled"];

  item.innerHTML = /*html*/ `
    <div class="item">
        <img
            class="thumbnail"
            src=${movieInstance.poster_path}
            alt=${movieInstance.title}
        />
        <div class="item-desc">
            <p class="rate">
            <img src="${starImagePath}" class="star" /><span
                >${movieInstance.vote_average}</span
            >
            </p>
            <strong>${movieInstance.title}</strong>
        </div>
    </div>
    `;
  return item;
}
