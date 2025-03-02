export function showSkeletonUI(movieContainer) {
  if (!movieContainer) return;

  movieContainer.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const skeletonItem = document.createElement("li");
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
    movieContainer.appendChild(skeletonItem);
  }
}

export function renderMovies(movieContainer, movies) {
  if (!movieContainer) return;

  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const li = document.createElement("li");
    li.className = "movie-item";
    li.innerHTML = `
      <div class="item">
        <img class="thumbnail" src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.title}" />
        <div class="item-desc">
          <p class="rate"><img src="./images/star_empty.png" class="star" /> <span>${movie.vote_average.toFixed(
            1
          )}</span></p>
          <strong>${movie.title}</strong>
        </div>
      </div>
    `;
    fragment.appendChild(li);
  });

  movieContainer.appendChild(fragment);
}
