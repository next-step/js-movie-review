import { MovieModel } from "../types/type";

export const renderMoviesInitial = (
  movieContainer: HTMLElement,
  movies: MovieModel[]
): void => {
  movieContainer.innerHTML = "";

  const movieGrid = document.createElement("div");
  movieGrid.classList.add("movie-grid");

  movieGrid.innerHTML = movies.map(movieTemplate).join("");

  movieContainer.appendChild(movieGrid);
};

export const appendMovies = (
  movieContainer: HTMLElement,
  movies: MovieModel[]
): void => {
  const movieGrid = movieContainer.querySelector(".movie-grid");
  if (!movieGrid) return;

  movieGrid.insertAdjacentHTML("beforeend", movies.map(movieTemplate).join(""));
};

export const showSkeletonUI = (movieContainer: HTMLElement): void => {
  const movieGrid = movieContainer.querySelector(".movie-grid");
  if (!movieGrid) return;

  const skeletonWrapper = document.createElement("div");
  skeletonWrapper.classList.add("skeleton-wrapper");
  skeletonWrapper.innerHTML = generateSkeletons(8);

  movieGrid.appendChild(skeletonWrapper);
};

export const removeSkeletonUI = (movieContainer: HTMLElement): void => {
  const skeletonWrapper = movieContainer.querySelector(".skeleton-wrapper");
  if (skeletonWrapper) {
    skeletonWrapper.remove();
  }
};

const movieTemplate = (movie: MovieModel): string => `
  <div class="movie-item">
    <div class="item" data-movie-id="${movie.id}">
      <img class="thumbnail" src="https://image.tmdb.org/t/p/w500${
        movie.poster_path
      }" 
           alt="${movie.title}">
      <div class="item-desc">
        <p class="rate">
          <img class="star" src="./images/star_empty.png">
          <span>${movie.vote_average.toFixed(1)}</span>
        </p>
        <strong>${movie.title}</strong>
      </div>
    </div>
  </div>
`;

const generateSkeletons = (count: number): string =>
  Array.from({ length: count })
    .map(
      () => `
        <div class="movie-item skeleton">
          <div class="item">
            <div class="skeleton skeleton-thumbnail"></div>
            <div class="item-desc">
              <div class="skeleton-star-row">
                <div class="skeleton skeleton-star"></div>
                <p class="skeleton skeleton-rate"></p>
              </div>
              <div class="skeleton-title-row">
                <strong class="skeleton skeleton-title"></strong>
              </div>
            </div>
          </div>
        </div>
      `
    )
    .join("");
