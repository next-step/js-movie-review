export function showSkeletonUI(movieContainer) {
  if (!movieContainer) return;

  movieContainer.innerHTML = "";

  const skeletonGrid = document.createElement("div");
  skeletonGrid.classList.add("movie-grid");

  for (let i = 0; i < 8; i++) {
    const skeletonItem = document.createElement("div");
    skeletonItem.classList.add("movie-item", "skeleton");

    skeletonItem.innerHTML = `
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
    `;

    skeletonGrid.appendChild(skeletonItem);
  }

  movieContainer.appendChild(skeletonGrid);
}

export function renderMovies(movieContainer, movies) {
  if (!movieContainer) return;

  movieContainer.innerHTML = "";

  const movieGrid = document.createElement("div");
  movieGrid.classList.add("movie-grid");

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    movieItem.innerHTML = `
      <div class="item">
        <img class="thumbnail" src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.title}" />
        <div class="item-desc">
          <p class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span>${movie.vote_average.toFixed(1)}</span>
          </p>
          <strong>${movie.title}</strong>
        </div>
      </div>
    `;

    movieGrid.appendChild(movieItem);
  });

  movieContainer.appendChild(movieGrid);
}
