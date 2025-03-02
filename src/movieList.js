import { fetchMovies } from "./api.js";

const SKELETON_COUNT = 8;

function showSkeletonUI() {
  const movieContainer = document.getElementById("movie-list-container");
  if (!movieContainer) return;

  movieContainer.innerHTML = "";

  for (let i = 0; i < SKELETON_COUNT; i++) {
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

async function loadMovies() {
  const movieContainer = document.getElementById("movie-list-container");
  if (!movieContainer) return;

  showSkeletonUI();

  try {
    const movies = await fetchMovies();
    movieContainer.innerHTML = "";

    movies.forEach((movie) => {
      const movieItem = document.createElement("li");
      movieItem.classList.add("movie-item");

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");

      const img = document.createElement("img");
      img.classList.add("thumbnail");
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      img.alt = movie.title;

      const descDiv = document.createElement("div");
      descDiv.classList.add("item-desc");

      const rateP = document.createElement("p");
      rateP.classList.add("rate");
      rateP.innerHTML = `<img src="./images/star_empty.png" class="star" /> <span>${movie.vote_average.toFixed(
        1
      )}</span>`;

      const titleStrong = document.createElement("strong");
      titleStrong.textContent = movie.title;

      descDiv.appendChild(rateP);
      descDiv.appendChild(titleStrong);
      itemDiv.appendChild(img);
      itemDiv.appendChild(descDiv);
      movieItem.appendChild(itemDiv);
      movieContainer.appendChild(movieItem);
    });
  } catch (error) {
    console.error(error);
  }
}

export { loadMovies };
