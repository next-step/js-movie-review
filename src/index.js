import "../templates/common.css";
import "../templates/reset.css";
import starFilled from "../templates/star_filled.png";
import { fetchPopularMovies } from "./js/util/fetch";

function generateMovieItem({ title, rating, thumbnail }) {
  const item = document.createElement("li");
  item.innerHTML = /*html*/ `
  <a href="#">
    <div class="item-card">
      <img
        class="item-thumbnail"
        src="${thumbnail}"
        loading="lazy"
        alt="${title}"
      />
      <p class="item-title">${title}</p>
      <p class="item-score"><img src="${starFilled}" alt="별점" />${rating}</p>
    </div>
  </a>`;
  return item;
}

async function renderPopularMovies() {
  const itemList = document.querySelector(".item-list");

  const popularMovies = await fetchPopularMovies();
  const movieItems = popularMovies.map((movie) => {
    return generateMovieItem({
      title: movie.title,
      rating: movie.vote_average,
      thumbnail: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
    });
  });

  movieItems.forEach((item) => itemList.appendChild(item));
}

addEventListener("DOMContentLoaded", async () => {
  await renderPopularMovies();
});
