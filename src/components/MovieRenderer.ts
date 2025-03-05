export function showSkeletonUI(movieContainer) {
  if (!movieContainer) {
    console.error("movieContainer가 없습니다");
    return;
  }

  movieContainer.innerHTML = "";

  const skeletonItems = Array.from({ length: 8 })
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

  movieContainer.innerHTML = `<div class="movie-grid">${skeletonItems}</div>`;
}

export function renderMovies(movieContainer, movies) {
  if (!movieContainer) {
    console.error("movieContainer가 없습니다");
    return;
  }
  movieContainer.innerHTML = "";

  const movieGrid = document.createElement("div");
  movieGrid.classList.add("movie-grid");

  movieContainer.innerHTML = "";

  const movieItemsHTML = movies
    .map(
      (movie) => `
      <div class="movie-item">
        <div class="item">
          <img class="thumbnail" src="https://image.tmdb.org/t/p/w500${
            movie.poster_path
          }" alt="${movie.title}">
          <div class="item-desc">
            <p class="rate">
              <img class="star" src="./images/star_empty.png">
              <span>${movie.vote_average.toFixed(1)}</span>
            </p>
            <strong>${movie.title}</strong>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  movieContainer.innerHTML = `<div class="movie-grid">${movieItemsHTML}</div>`;
}
