export function showSkeletonUI(movieContainer) {
  if (!movieContainer) return;

  movieContainer.innerHTML = "";

  const skeletonGrid = document.createElement("div");
  skeletonGrid.classList.add("movie-grid");

  const fragment = document.createDocumentFragment();

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

    fragment.appendChild(skeletonItem);
  }

  skeletonGrid.appendChild(fragment);
  movieContainer.appendChild(skeletonGrid);
}

export function renderMovies(movieContainer, movies) {
  if (!movieContainer) return;

  movieContainer.innerHTML = "";

  const movieGrid = document.createElement("div");
  movieGrid.classList.add("movie-grid");

  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    const item = document.createElement("div");
    item.classList.add("item");

    const img = document.createElement("img");
    img.classList.add("thumbnail");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;

    const itemDesc = document.createElement("div");
    itemDesc.classList.add("item-desc");

    const rate = document.createElement("p");
    rate.classList.add("rate");

    const starImg = document.createElement("img");
    starImg.src = "./images/star_empty.png";
    starImg.classList.add("star");

    const rateValue = document.createElement("span");
    rateValue.textContent = movie.vote_average.toFixed(1);

    const title = document.createElement("strong");
    title.textContent = movie.title;

    rate.append(starImg, rateValue);
    itemDesc.append(rate, title);
    item.append(img, itemDesc);
    movieItem.append(item);
    fragment.append(movieItem);
  });

  movieGrid.appendChild(fragment);
  movieContainer.appendChild(movieGrid);
}
