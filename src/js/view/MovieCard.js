import { createElement } from "../../utils/dom.js";

const MovieCard = {
  generateMovieCard(movie) {
    const { title, rating, thumbnail } = movie;
    const card = createElement("li");
    card.innerHTML = /* html */ `
    <a href="#">
    <div class="item-card">
      <img
        class="item-thumbnail"
        src=${thumbnail}
        loading="lazy"
        alt=${title}
      />
      <p class="item-title">${title}</p>
      <p class="item-score"><img src="./star_filled.png" alt="별점" /> ${rating}</p>
    </div>
  </a>
    `;
    return card;
  },
};
export default MovieCard;
