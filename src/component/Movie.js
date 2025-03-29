import { starImage } from "../Image.js";

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
  item.classList.add("movie");

  const starImagePath =
    movieInstance.voteAverage === "0.0"
      ? starImage["empty"]
      : starImage["filled"];

  item.innerHTML = /*html*/ `
    <input hidden id="movie-id" value="${movieInstance.id}">
    <div class="item">
        <img
            class="thumbnail"
            src=${movieInstance.posterPath}
            alt=${movieInstance.title}
        />
        <div class="item-desc">
            <p class="rate">
            <img src="${starImagePath}" class="star" /><span
                >${movieInstance.voteAverage}</span
            >
            </p>
            <strong>${movieInstance.title}</strong>
        </div>
    </div>
    `;
  return item;
}
