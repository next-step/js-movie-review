import { fetchMovies } from "./api.js";

async function loadMovies() {
  const movieContainer = document.getElementById("movie-list-container");
  if (!movieContainer) return;

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
}

export { loadMovies };
